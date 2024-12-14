const axios = require('axios');
const { IntegrationIfood } = require('../models');

const urlIfood = process.env.IFOOD_API_URL
const clientId = process.env.IFOOD_CLIENT_ID
const clientSecret = process.env.IFOOD_CLIENT_SECRET

const getAuthorizationCode = async (req, res) => {
    try {
        const response = await axios.post(
            urlIfood + "/oauth/userCode",
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
        const response = await axios.post(urlIfood + "/oauth/token", {
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

        let integration = await IntegrationIfood.findOne({ where: { company_id: company_id } });

        if (integration) {
            integration.access_token = accessToken;
            integration.refresh_token = refreshToken;
            integration.token_expires_at = new Date(Date.now() + expiresIn * 1000);
            await integration.save();
        } else {
            integration = await IntegrationIfood.create({
                company_id,
                access_token: accessToken,
                refresh_token: refreshToken,
                token_expires_at: new Date(Date.now() + expiresIn * 1000),
            });
        }

        return res.status(200).json({ message: "Token gerado e salvo com sucesso!", integration });
    } catch (error) {
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
        return res.status(200).json({ message: "Webhook recebido com sucesso." });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao processar dados.", error: error.message });
    }
};


module.exports = {
    postWebHook,
    getAuthorizationCode,
    postGenerateToken,
    unlinkIfoodIntegration
};
