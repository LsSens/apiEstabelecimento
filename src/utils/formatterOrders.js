function formatterOrder(order) {
    return {
        id: order.id,
        ifood_id: order.ifoodOrder?.ifood_id || null,
        customer_id: order.customer_id,
        customer: order.customer,
        total: order.total,
        status: order.status,
        company_id: order.company_id,
        payment_method: order.payment_method,
        delivery_fee: order.delivery_fee,
        notes: order.notes,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        deletedAt: order.deletedAt,
        delivery_id: order.deliveryOrder?.delivery_id || null,
        items: order.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.OrderItems.quantity,
        })),
    }
};

module.exports = { formatterOrder };
