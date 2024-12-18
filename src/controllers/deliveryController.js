const { Delivery, DeliveryOrder, Order, Item, Customer, IfoodOrder, IntegrationIfood } = require("../models");
const paginationService = require("../services/paginationService");
const { formatterDelivery } = require("../utils/formatterDeliveries");
const IfoodService = require('../services/ifoodService');

const getDeliveriesByCompany = async (req, res) => {
  const { company_id } = req.user;

  if (!company_id) {
    return res.status(401).json({ error: "Acesso negado. Token inválido." });
  }

  try {
    await paginationService(Delivery, {
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
              through: { attributes: ["quantity"] },
            },
            {
              model: Customer,
              as: "customer",
              attributes: ["id", "name", "email", "address"],
            },
          ],
        },
      ],
    })(req, res, () => {
      // Formata os deliveries paginados
      const formattedDeliveries = res.pagination.data.map((delivery) => {
        return formatterDelivery(delivery);
      });

      // Retorna a resposta paginada
      res.status(200).json({
        currentPage: res.pagination.currentPage,
        totalPages: res.pagination.totalPages,
        totalItems: res.pagination.totalItems,
        itemsPerPage: res.pagination.itemsPerPage,
        data: formattedDeliveries,
      });
    });
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
            {
              model: Customer,
              as: "customer",
              attributes: ["id", "name", "email", "address"],
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
  const { orders } = req.body;
  const { company_id } = req.user;
  let total_cost = 0
  let total_fee = 0

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

    // Verificar se todos os pedidos têm status PENDING
    const nonPendingOrders = validOrders.filter(
      (order) => order.status !== "PENDING"
    );

    if (nonPendingOrders.length > 0) {
      return res.status(400).json({
        error: `Os pedidos com ID ${nonPendingOrders
          .map((order) => order.id)
          .join(", ")} não estão com status PENDING.`,
      });
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

    // LOGICA PARA PEDIDOS DO IFOOD
    await Promise.all(
      orders.map(async (orderId) => {
        const ifoodOrder = await IfoodOrder.findOne({ where: { order_id: orderId } });
        if (ifoodOrder) {
          const integration = await IntegrationIfood.findOne({ where: { company_id } });
          if (!integration) {
            throw new Error(`Integração com iFood não encontrada para a empresa ${company_id}.`);
          }

          const accessToken = integration.access_token;
          const ifoodOrderId = ifoodOrder.ifood_order_id;
          await IfoodService.startPreparationOrder(ifoodOrderId, accessToken);
        }
      })
    );
    //

    // Criar o delivery
    const delivery = await Delivery.create({
      company_id,
      total_cost,
      total_fee,
      delivery_status: "PREPARING",
    });

    // Relacionar orders ao delivery na tabela delivery_orders
    const deliveryOrders = orders.map((orderId) => ({
      delivery_id: delivery.id,
      order_id: orderId,
    }));

    await DeliveryOrder.bulkCreate(deliveryOrders);

    // Atualizar status das orders para "PREPARING"
    await Order.update(
      { status: "PREPARING" },
      { where: { id: orders } }
    );

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
            {
              model: Customer,
              as: "customer",
              attributes: ["id", "name", "email", "address"],
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

const cancelDelivery = async (req, res) => {
  const { deliveryId } = req.params;
  const { company_id } = req.user;

  if (!company_id) {
    return res.status(401).json({ error: "Acesso negado. Token inválido." });
  }

  try {
    // Buscar o delivery e verificar se pertence à empresa
    const delivery = await Delivery.findOne({
      where: { id: deliveryId, company_id },
      include: [
        {
          model: Order,
          as: "orders",
        },
      ],
    });

    if (!delivery) {
      return res.status(404).json({ error: "Delivery não encontrado." });
    }

    // LOGICA PARA PEDIDOS DO IFOOD
    await Promise.all(
      delivery.orders.map(async (order) => {
        try {
          const ifoodOrder = await IfoodOrder.findOne({ where: { order_id: order.id } });
          if (ifoodOrder) {
            const integration = await IntegrationIfood.findOne({ where: { company_id } });
            if (!integration) {
              throw new Error(`Integração com iFood não encontrada para a empresa ${company_id}.`);
            }

            const accessToken = integration.access_token;
            const ifoodOrderId = ifoodOrder.ifood_order_id;
            await IfoodService.cancelOrder(ifoodOrderId, "Cancelado pelo estabelecimento", 501, accessToken);
          }
        } catch (error) {
          console.error(`Erro ao cancelar pedido no iFood para orderId: ${order.id}`, error);
          throw new Error(`Erro ao cancelar pedido no iFood para orderId: ${order.id}`, error);
        }
      })
    );
    //

    await Delivery.update(
      { delivery_status: "CANCELED", deletedAt: new Date() },
      { where: { id: deliveryId } }
    );

    const orderIds = delivery.orders.map((order) => order.id);
    await Order.update(
      { status: "CANCELED", deletedAt: new Date() },
      { where: { id: orderIds } }
    );

    res.status(200).json({ message: "Delivery cancelado com sucesso." });
  } catch (error) {
    console.error("Erro ao cancelar delivery:", error);
    res.status(500).json({ error: "Erro ao cancelar delivery." });
  }
};

module.exports = {
  createDelivery,
  getDeliveryById,
  getDeliveriesByCompany,
  cancelDelivery
};
