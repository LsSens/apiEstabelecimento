const axios = require('axios');
const { IntegrationIfood, IfoodOrder } = require('../models');
const { createOrder } = require('./orderController');

const urlIfood = process.env.IFOOD_API_URL
const clientId = process.env.IFOOD_CLIENT_ID
const clientSecret = process.env.IFOOD_CLIENT_SECRET

const getAuthorizationCode = async (req, res) => {
    try {
        const response = await axios.post(
            urlIfood + "/authentication/v1.0/oauth/userCode",
            { clientId },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const { userCode, authorizationCodeVerifier, verificationUrl, verificationUrlComplete, expiresIn } = response.data;

        return res.status(200).json({
            userCode,
            authorizationCodeVerifier,
            verificationUrl,
            verificationUrlComplete,
            expiresIn,
        });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao gerar o código de autenticação.", error: error.message });
    }
};

const postGenerateToken = async (req, res) => {
    const { authorizationCode, authorizationCodeVerifier } = req.body;
    const { company_id } = req.user;

    if (!authorizationCode || !authorizationCodeVerifier || !company_id) {
        return res.status(400).json({ message: "Dados incompletos na requisição." });
    }

    try {
        const response = await axios.post(urlIfood + "/authentication/v1.0/oauth/token", {
            grantType: "authorization_code",
            clientId,
            clientSecret,
            authorizationCode,
            authorizationCodeVerifier,
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const { accessToken, refreshToken, expiresIn } = response.data;

        console.log(response.data)

        const responseMerchant = await axios.get(urlIfood + "/merchant/v1.0/merchants", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            },
        });


        const { id, name, corporateName } = responseMerchant.data[0]

        let integration = await IntegrationIfood.findOne({ where: { company_id: company_id } });

        if (integration) {
            integration.merchant_id = id;
            integration.name = name;
            integration.corporateName = corporateName;
            integration.access_token = accessToken;
            integration.refresh_token = refreshToken;
            integration.token_expires_at = new Date(Date.now() + expiresIn * 1000);
            await integration.save();
        } else {
            integration = await IntegrationIfood.create({
                merchant_id: id,
                name: name,
                corporateName: corporateName,
                company_id,
                access_token: accessToken,
                refresh_token: refreshToken,
                token_expires_at: new Date(Date.now() + expiresIn * 1000),
            });
        }

        return res.status(200).json({ message: "Token gerado e salvo com sucesso!", integration });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Erro ao gerar o token.", error: error.message });
    }
}

const unlinkIfoodIntegration = async (req, res) => {
    try {
        const { company_id } = req.user;

        const integration = await IntegrationIfood.findOne({ where: { company_id } });

        if (!integration) {
            return res.status(404).json({ message: "Integração com o iFood não encontrada." });
        }

        await integration.destroy();

        return res.status(200).json({ message: "Integração com o iFood removida com sucesso." });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao remover a integração com o iFood." });
    }
};

const postWebHook = async (req, res) => {
    try {
        console.log(req.body);
        const { code, merchantId, orderId } = req.body;

        if (code !== 'PLC') {
            return res.status(200).json({ message: "Evento ignorado." });
        }

        // Buscar integração pelo merchantId
        const integration = await IntegrationIfood.findOne({
            where: { merchant_id: merchantId },
        });

        if (!integration) {
            return res.status(404).json({ message: "Integração não encontrada para o merchantId." });
        }

        const { access_token, company_id } = integration;

        // Buscar detalhes do pedido no iFood
        const ifoodOrderDetails = await axios.get(`${urlIfood}/order/v1.0/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const orderDetails = ifoodOrderDetails.data;

        // Formatando os dados no formato esperado pelo createOrder
        const formattedOrder = {
            customer: {
                name: orderDetails.customer.name,
                email: orderDetails.customer.email || null,
                address: {
                    street: orderDetails.deliveryAddress.streetName,
                    number: orderDetails.deliveryAddress.streetNumber,
                    neighborhood: orderDetails.deliveryAddress.neighborhood,
                    city: orderDetails.deliveryAddress.city,
                    state: orderDetails.deliveryAddress.state,
                    cep: orderDetails.deliveryAddress.postalCode,
                },
                phone: orderDetails.customer.phone.number || null,
            },
            items: orderDetails.items.map((item) => ({
                item_id: item.externalCode,
                quantity: item.quantity,
            })),
            total: orderDetails.total.subTotal,
            payment_method: orderDetails.payments.methods[0].type,
            delivery_fee: orderDetails.total.deliveryFee,
            notes: orderDetails.delivery.description || "",
            company_id,
        };

        // Chamar o createOrder diretamente com os dados formatados
        req.body = formattedOrder;
        req.user = { company_id };

        const response = await createOrder(req, res);

        // Registrar o pedido no ifood_orders
        const createdOrder = response.json;
        await IfoodOrder.create({
            order_id: createdOrder.id,
            ifood_id: orderDetails.displayId,
        });

        return res.status(200).json({ message: "Pedido processado com sucesso." });
    } catch (error) {
        console.error("Erro ao processar webhook:", error);
        return res.status(500).json({ message: "Erro ao processar dados.", error: error.message });
    }
};



module.exports = {
    postWebHook,
    getAuthorizationCode,
    postGenerateToken,
    unlinkIfoodIntegration
};
