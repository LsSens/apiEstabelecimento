// Formatar a resposta para remover DeliveryOrder e ajustar items
function formatterDelivery(delivery) {
  return {
    id: delivery.id,
    company_id: delivery.company_id,
    delivery_status: delivery.delivery_status,
    total_cost: delivery.total_cost,
    total_fee: delivery.total_fee,
    createdAt: delivery.createdAt,
    updatedAt: delivery.updatedAt,
    deletedAt: delivery.deletedAt,
    orders: delivery.orders.map((order) => ({
      id: order.id,
      total: order.total,
      status: order.status,
      company_id: order.company_id,
      payment_method: order.payment_method,
      delivery_fee: order.delivery_fee,
      notes: order.notes,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      customer: order.customer,
      items: order.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.OrderItems.quantity,
      })),
    })),
  };
}

module.exports = { formatterDelivery };
