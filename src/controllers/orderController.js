const {
  Order,
  Item,
  Customer,
  Company,
  OrderItems,
  CustomerCompany,
  DeliveryOrder
} = require("../models");
const paginationService = require("../services/paginationService");
const { formatterOrder } = require("../utils/formatterOrders");

const getOrders = async (req, res) => {
  const { company_id } = req.user;

  if (!company_id) {
    return res.status(401).json({ error: "Acesso negado. Token inválido." });
  }

  try {
    await paginationService(Order, {
      where: { company_id },
      order: [["id", "DESC"]],
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
        {
          model: DeliveryOrder,
          as: "deliveryOrder",
          attributes: ["delivery_id"],
        },
      ],
    })(req, res, () => {
      const formattedOrders = res.pagination.data.map((order) => {
        return formatterOrder(order)
      });

      res.status(200).json({
        currentPage: res.pagination.currentPage,
        totalPages: res.pagination.totalPages,
        totalItems: res.pagination.totalItems,
        itemsPerPage: res.pagination.itemsPerPage,
        data: formattedOrders,
      });
    });
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return res.status(500).json({ error: "Erro ao buscar pedidos." });
  }
};

const createOrder = async (req, res) => {
  let { company_id } = req.user;

  if (!company_id) {
    company_id = req.body.company_id;
  }

  const { customer, items, total, payment_method, delivery_fee, notes } = req.body;

  try {
    const companyExists = await Company.findByPk(company_id);
    if (!companyExists) {
      return res.status(404).json({ error: "Empresa não encontrada." });
    }

    const existingCustomer = await Customer.findOne({
      where: {
        name: customer.name,
        address: customer.address,
      },
    });

    let customerId;
    if (existingCustomer) {
      customerId = existingCustomer.id;
    } else {
      const newCustomer = await Customer.create({
        name: customer.name,
        email: customer.email || null,
        address: JSON.stringify(customer.address),
        phone: customer.phone || null,
      });
      customerId = newCustomer.id;
    }

    const itemIds = items.map((item) => item.item_id);
    const existingItems = await Item.findAll({
      where: { id: itemIds, company_id },
      attributes: ["id"],
    });

    const existingItemIds = existingItems.map((item) => item.id);
    const invalidItems = itemIds.filter((id) => !existingItemIds.includes(id));

    if (invalidItems.length > 0) {
      return res.status(400).json({
        error: "Alguns itens não existem ou não pertencem à sua empresa.",
        invalidItems,
      });
    }

    const order = await Order.create({
      customer_id: customerId,
      company_id,
      total,
      status: "PENDING",
      payment_method,
      delivery_fee,
      notes,
    });

    if (items && items.length > 0) {
      const orderItems = items.map((item) => ({
        order_id: order.id,
        item_id: item.item_id,
        quantity: item.quantity,
      }));

      await OrderItems.bulkCreate(orderItems);
    }

    const customerCompanyExists = await CustomerCompany.findOne({
      where: { customer_id: customerId, company_id },
    });

    if (!customerCompanyExists) {
      await CustomerCompany.create({ customer_id: customerId, company_id });
    }

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
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  const { company_id } = req.user;

  if (!company_id) {
    return res.status(401).json({ error: "Acesso negado. Token inválido." });
  }

  try {
    const order = await Order.findOne({
      where: { id: orderId, company_id },
    });

    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    await order.update({
      status: "CANCELED",
      deletedAt: new Date(),
    });

    return res.status(200).json({ message: "Pedido cancelado com sucesso." });
  } catch (error) {
    console.error("Erro ao cancelar pedido:", error);
    return res.status(500).json({ error: "Erro ao cancelar pedido." });
  }
};

const createOrderLogic = async (orderData) => {
  const { company_id, customer, items, total, payment_method, delivery_fee, notes } = orderData;

  const companyExists = await Company.findByPk(company_id);
  if (!companyExists) {
    throw new Error("Empresa não encontrada.");
  }

  const existingCustomer = await Customer.findOne({
    where: {
      name: customer.name,
      address: customer.address,
    },
  });

  let customerId;
  if (existingCustomer) {
    customerId = existingCustomer.id;
  } else {
    const newCustomer = await Customer.create({
      name: customer.name,
      email: customer.email || null,
      address: customer.address,
      phone: customer.phone || null,
    });
    customerId = newCustomer.id;
  }

  // **Processar itens: verificar, criar ou usar existentes**
  const processedItems = await Promise.all(
    items.map(async (item) => {
      // Verificar se o item já existe na empresa
      const existingItem = await Item.findOne({
        where: {
          name: item.name,
          company_id,
        },
      });

      if (existingItem) {
        // Retornar o ID do item existente
        return { item_id: existingItem.id, quantity: item.quantity };
      }

      // Criar o item se não existir
      const newItem = await Item.create({
        name: item.name,
        price: item.price,
        available: true,
        company_id,
      });

      // Retornar o ID do item recém-criado
      return { item_id: newItem.id, quantity: item.quantity };
    })
  );

  // Criar o pedido
  const order = await Order.create({
    customer_id: customerId,
    company_id,
    total,
    status: "PENDING",
    payment_method,
    delivery_fee,
    notes,
  });

  // Associar os itens ao pedido
  if (processedItems.length > 0) {
    const orderItems = processedItems.map((item) => ({
      order_id: order.id,
      item_id: item.item_id,
      quantity: item.quantity,
    }));

    await OrderItems.bulkCreate(orderItems);
  }

  const customerCompanyExists = await CustomerCompany.findOne({
    where: { customer_id: customerId, company_id },
  });

  if (!customerCompanyExists) {
    await CustomerCompany.create({ customer_id: customerId, company_id });
  }

  return order;
};

module.exports = { getOrders, createOrder, deleteOrder, createOrderLogic };
