const express = require("express");
const router = express.Router();
const {
  Order,
  Item,
  Customer,
  Company,
  OrderItems,
  CustomerCompany,
} = require("../models");
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  // Primeiro, tenta obter o company_id do token
  const { company_id } = req.user;

  if (!company_id) {
    return res.status(401).json({ error: "Acesso negado. Token invalido." });
  }

  try {
    const orders = await Order.findAll({
      where: {
        company_id,
      },
      include: [
        {
          model: Item,
          as: "items",
          through: { attributes: ["quantity"] },
          attributes: ["id", "name", "price"],
        },
        {
          model: Customer,
          as: "customer",
          attributes: ["id", "name", "email", "address"],
        },
      ],
    });

    // Ajusta o formato dos pedidos e itens
    const formattedOrders = orders.map((order) => ({
      ...order.toJSON(),
      items: order.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.OrderItems.quantity,
      })),
    }));

    return res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return res.status(500).json({ error: "Erro ao buscar pedidos." });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  let { company_id } = req.user;

  if (!company_id) {
    company_id = req.body.company_id;
  }

  const { customer_id, items, total, payment_method, delivery_fee, notes } =
    req.body;

  try {
    // Verifica se o company_id existe na tabela companies
    const companyExists = await Company.findByPk(company_id);
    if (!companyExists) {
      return res.status(404).json({ error: "Empresa não encontrada." });
    }

    // Verifica se o cliente existe
    const customerExists = await Customer.findByPk(customer_id);
    if (!customerExists) {
      return res.status(400).json({ error: "Cliente não encontrado." });
    }

    // Verifica se todos os itens existem e pertencem ao company_id
    const itemIds = items.map((item) => item.item_id);
    const existingItems = await Item.findAll({
      where: {
        id: itemIds,
        company_id, // Verifica se o item pertence à empresa
      },
      attributes: ["id"],
    });

    // Extrai os IDs dos itens que existem
    const existingItemIds = existingItems.map((item) => item.id);

    // Verifica itens ausentes ou que não pertencem à empresa
    const invalidItems = itemIds.filter((id) => !existingItemIds.includes(id));

    if (invalidItems.length > 0) {
      return res.status(400).json({
        error: "Alguns itens não existem ou não pertencem à sua empresa.",
        invalidItems,
      });
    }

    // Cria o pedido
    const order = await Order.create({
      customer_id,
      company_id,
      total,
      status: "PENDING",
      payment_method,
      delivery_fee,
      notes,
    });

    // Relaciona itens ao pedido
    if (items && items.length > 0) {
      const orderItems = items.map((item) => ({
        order_id: order.id,
        item_id: item.item_id,
        quantity: item.quantity,
      }));

      await OrderItems.bulkCreate(orderItems);
    }

    // Verifica se a relação customer-company já existe
    const customerCompanyExists = await CustomerCompany.findOne({
      where: { customer_id, company_id },
    });

    // Cria a relação caso não exista
    if (!customerCompanyExists) {
      await CustomerCompany.create({
        customer_id,
        company_id,
      });
    }

    // Retorna o pedido criado com os itens
    const createdOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: Item,
          as: "items",
          through: { attributes: ["quantity"] },
          attributes: ["id", "name", "price"],
        },
      ],
    });

    // Ajusta o formato dos itens para incluir "quantity" diretamente
    const formattedOrder = {
      ...createdOrder.toJSON(),
      items: createdOrder.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.OrderItems.quantity,
      })),
    };

    return res.status(201).json(formattedOrder);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return res.status(500).json({ error: "Erro ao criar pedido." });
  }
});

module.exports = router;
