const { Delivery, DeliveryOrder, Order, Item } = require("../models");
const { formatterDelivery } = require("../utils/formatterDeliveries");

const getDeliveriesByCompany = async (req, res) => {
  const { company_id } = req.user;

  if (!company_id) {
    return res.status(401).json({ error: "Acesso negado. Token inválido." });
  }

  try {
    // Buscar todos os deliveries da empresa
    const deliveries = await Delivery.findAll({
      where: { company_id },
      include: [
        {
          model: Order,
          as: "orders",
          include: [
            {
              model: Item,
              as: "items",
              attributes: ["id", "name", "price"],
              through: { attributes: ["quantity"] }, // Para incluir a quantidade
            },
          ],
        },
      ],
    });

    if (!deliveries || deliveries.length === 0) {
      return res
        .status(404)
        .json({ error: "Nenhum delivery encontrado para esta empresa." });
    }

    // Formatando a resposta para incluir as orders e itens
    const formattedDeliveries = deliveries.map((delivery) => {
      return formatterDelivery(delivery);
    });

    res.status(200).json(formattedDeliveries);
  } catch (error) {
    console.error("Erro ao buscar deliveries:", error);
    res.status(500).json({ error: "Erro ao buscar deliveries." });
  }
};

const getDeliveryById = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar o delivery com as orders associadas
    const delivery = await Delivery.findByPk(id, {
      include: [
        {
          model: Order,
          as: "orders",
          include: [
            {
              model: Item,
              as: "items",
              attributes: ["id", "name", "price"],
              through: { attributes: ["quantity"] },
            },
          ],
        },
      ],
    });

    if (!delivery) {
      return res.status(404).json({ error: "Delivery não encontrado." });
    }

    const formattedDelivery = formatterDelivery(delivery);

    res.status(200).json(formattedDelivery);
  } catch (error) {
    console.error("Erro ao buscar delivery:", error);
    res.status(500).json({ error: "Erro ao buscar delivery." });
  }
};

const createDelivery = async (req, res) => {
  const { company_id, orders, total_cost, total_fee } = req.body;

  if (!Array.isArray(orders) || orders.length === 0) {
    return res
      .status(400)
      .json({ error: "Pelo menos um pedido é necessário." });
  }

  try {
    // Verificar se as orders existem e pertencem à empresa
    const validOrders = await Order.findAll({
      where: { id: orders, company_id },
      include: [
        {
          model: Item,
          as: "items",
          attributes: ["id", "name", "price"],
          through: { attributes: ["quantity"] },
        },
      ],
    });

    if (validOrders.length !== orders.length) {
      return res.status(400).json({ error: "Alguns pedidos são inválidos." });
    }

    // Verificar se as orders já estão associadas a outros deliveries
    const existingOrdersInOtherDeliveries = await DeliveryOrder.findAll({
      where: {
        order_id: orders,
      },
    });

    const existingOrderIdsInOtherDeliveries =
      existingOrdersInOtherDeliveries.map(
        (deliveryOrder) => deliveryOrder.order_id
      );

    if (existingOrderIdsInOtherDeliveries.length > 0) {
      return res.status(400).json({
        error: `O pedido com ID ${existingOrderIdsInOtherDeliveries[0]} já está associado a outro delivery.`,
      });
    }

    // Criar o delivery
    const delivery = await Delivery.create({
      company_id,
      total_cost,
      total_fee,
      delivery_status: "PENDING",
    });

    // Relacionar orders ao delivery na tabela delivery_orders
    const deliveryOrders = orders.map((orderId) => ({
      delivery_id: delivery.id,
      order_id: orderId,
    }));

    await DeliveryOrder.bulkCreate(deliveryOrders);

    // Retornar o delivery com as orders associadas
    const createdDelivery = await Delivery.findByPk(delivery.id, {
      include: [
        {
          model: Order,
          as: "orders",
          include: [
            {
              model: Item,
              as: "items",
              attributes: ["id", "name", "price"],
              through: { attributes: ["quantity"] },
            },
          ],
        },
      ],
    });

    const formattedDelivery = formatterDelivery(createdDelivery);

    res.status(201).json({
      message: "Delivery criado com sucesso.",
      data: formattedDelivery,
    });
  } catch (error) {
    console.error("Erro ao criar delivery:", error);
    res.status(500).json({ error: "Erro ao criar delivery." });
  }
};

module.exports = {
  createDelivery,
  getDeliveryById,
  getDeliveriesByCompany,
};
