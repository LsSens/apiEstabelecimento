const axios = require('axios');
const { IntegrationIfood, IfoodOrder } = require('../models');

class IfoodService {
    constructor() {
        this.urlIfood = process.env.IFOOD_API_URL;
    }

    // Busca a integração do merchantId
    async getIntegrationByMerchant(merchantId) {
        return await IntegrationIfood.findOne({ where: { merchant_id: merchantId } });
    }

    // Busca os detalhes do pedido no iFood
    async fetchOrderDetails(orderId, accessToken) {
        const response = await axios.get(`${this.urlIfood}/order/v1.0/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data;
    }

    // Formata os dados do pedido
    formatOrderDetails(orderDetails, company_id) {
        return {
            customer: {
                name: orderDetails.customer.name,
                email: orderDetails.customer.email || null,
                address: {
                    street: orderDetails.delivery.deliveryAddress.streetName,
                    number: orderDetails.delivery.deliveryAddress.streetNumber,
                    city: orderDetails.delivery.deliveryAddress.city,
                    state: orderDetails.delivery.deliveryAddress.state,
                    cep: orderDetails.delivery.deliveryAddress.postalCode,
                    lat: orderDetails.delivery.deliveryAddress.coordinates.latitude,
                    lng: orderDetails.delivery.deliveryAddress.coordinates.longitude,
                    neighborhood: orderDetails.delivery.deliveryAddress.neighborhood,
                    complement: orderDetails.delivery.deliveryAddress.complement,
                },
                phone: orderDetails.customer.phone.number || null,
            },
            items: orderDetails.items.map((item) => ({
                name: item.name,
                price: item.price,
                description: item.observations,
                image: item.imageUrl,
                quantity: item.quantity,
            })),
            total: orderDetails.total.subTotal,
            payment_method: orderDetails.payments.methods[0].type,
            delivery_fee: orderDetails.total.deliveryFee,
            notes: orderDetails.delivery.description || "",
            company_id,
        };
    }

    async saveIfoodOrder(orderId, ifoodId) {
        return await IfoodOrder.create({
            order_id: orderId,
            ifood_id: ifoodId,
        });
    }
}

module.exports = new IfoodService();
