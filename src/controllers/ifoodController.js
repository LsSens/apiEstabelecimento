const IfoodService = require('../services/ifoodService');
const { createOrderLogic } = require('./orderController');
const { IntegrationIfood } = require('../models');

const getAuthorizationCode = async (req, res) => {
    try {
        const result = await IfoodService.getAuthorizationCode();
        return res.status(200).json(result);
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
        const tokenData = await IfoodService.generateToken(authorizationCode, authorizationCodeVerifier);
        const { accessToken, refreshToken, expiresIn } = tokenData;

        const merchant = await IfoodService.fetchMerchants(accessToken);
        const integration = await IntegrationIfood.upsert({
            company_id,
            merchant_id: merchant.id,
            name: merchant.name,
            corporateName: merchant.corporateName,
            access_token: accessToken,
            refresh_token: refreshToken,
            token_expires_at: new Date(Date.now() + expiresIn * 1000),
        });

        return res.status(200).json({ message: "Token gerado e salvo com sucesso!", integration });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao gerar o token.", error: error.message });
    }
};

const postWebHook = async (req, res) => {
    try {
        const { code, merchantId, orderId } = req.body;

        if (code !== 'PLC') {
            return res.status(200).json({ message: "Evento ignorado." });
        }

        const integration = await IfoodService.getIntegrationByMerchant(merchantId);
        const orderDetails = await IfoodService.fetchOrderDetails(orderId, integration.access_token);
        const formattedOrder = IfoodService.formatOrderDetails(orderDetails, integration.company_id);

        const createdOrder = await createOrderLogic(formattedOrder);
        await IfoodService.saveIfoodOrder(createdOrder.id, orderDetails.displayId, orderDetails.id);

        return res.status(200).json({ message: "Pedido processado com sucesso." });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao processar webhook.", error: error.message });
    }
};

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

module.exports = {
    getAuthorizationCode,
    postGenerateToken,
    postWebHook,
    unlinkIfoodIntegration,
};
