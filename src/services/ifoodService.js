const axios = require('axios');
const { IntegrationIfood, IfoodOrder } = require('../models');

class IfoodService {
    constructor() {
        this.baseUrl = process.env.IFOOD_API_URL;
        this.clientId = process.env.IFOOD_CLIENT_ID;
        this.clientSecret = process.env.IFOOD_CLIENT_SECRET;
    }

    async getAuthorizationCode() {
        const response = await axios.post(
            `${this.baseUrl}/authentication/v1.0/oauth/userCode`,
            { clientId: this.clientId },
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        return response.data;
    }

    async generateToken(authorizationCode, authorizationCodeVerifier) {
        const response = await axios.post(
            `${this.baseUrl}/authentication/v1.0/oauth/token`,
            {
                grantType: "authorization_code",
                clientId: this.clientId,
                clientSecret: this.clientSecret,
                authorizationCode,
                authorizationCodeVerifier,
            },
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        return response.data;
    }

    async fetchMerchants(accessToken) {
        const response = await axios.get(`${this.baseUrl}/merchant/v1.0/merchants`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data[0];
    }

    async fetchOrderDetails(orderId, accessToken) {
        const response = await axios.get(
            `${this.baseUrl}/order/v1.0/orders/${orderId}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
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

    // Busca a integração do merchantId
    async getIntegrationByMerchant(merchantId) {
        return await IntegrationIfood.findOne({ where: { merchant_id: merchantId } });
    }

    async saveIfoodOrder(orderId, ifoodId, ifoodOrderId) {
        return await IfoodOrder.create({
            order_id: orderId,
            ifood_id: ifoodId,
            ifood_order_id: ifoodOrderId
        });
    }

    async cancelOrder(orderId, reason, cancellationCode, accessToken) {
        try {
            const response = await axios.post(
                `${this.baseUrl}/order/v1.0/orders/${orderId}/requestCancellation`,
                {
                    reason: reason,
                    cancellationCode: String(cancellationCode),
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(`Error cancelling order for orderId: ${orderId}`, error.response?.data || error.message);
            throw new Error("Failed to cancel order.");
        }
    }

    async startPreparationOrder(orderId, accessToken) {
        try {
            await axios.post(
                `${this.baseUrl}/order/v1.0/orders/${orderId}/confirm`, {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const response = await axios.post(
                `${this.baseUrl}/order/v1.0/orders/${orderId}/startPreparation`, {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error(`Error Start Preparation Order for orderId: ${orderId}`, error.response?.data || error.message);
            throw new Error("Failed to start preparation order.");
        }
    }
}

module.exports = new IfoodService();
