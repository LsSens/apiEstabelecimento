/**
 * @swagger
 * /ifood/generate-user-code:
 *   post:
 *     summary: Gera o código de autorização para autenticação no iFood.
 *     tags:
 *       - Integração - iFood
 *     responses:
 *       200:
 *         description: Código de autorização gerado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userCode:
 *                   type: string
 *                   description: Código para o cliente autorizar o app.
 *                   example: "RWNG-WDZK"
 *                 authorizationCodeVerifier:
 *                   type: string
 *                   description: Código necessário para trocar pelo token.
 *                   example: "o8ex6jxebboo7n1qeleft5gvmee7w7..."
 *                 verificationUrl:
 *                   type: string
 *                   description: URL para o cliente verificar o código.
 *                   example: "https://portal.ifood.com.br/apps/code"
 *                 verificationUrlComplete:
 *                   type: string
 *                   description: URL completa com o código incluído.
 *                   example: "https://portal.ifood.com.br/apps/code?c=RWNG-WDZK"
 *                 expiresIn:
 *                   type: integer
 *                   description: Tempo em segundos até a expiração do código.
 *                   example: 600
 *       500:
 *         description: Erro ao gerar o código de autorização.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao gerar o código de autorização."
 *                 error:
 *                   type: string
 *                   example: "Detalhes do erro técnico."
 */

/**
 * @swagger
 * /ifood/generate-token:
 *   post:
 *     summary: Troca o código de autorização pelo token de acesso.
 *     tags:
 *       - Integração - iFood
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authorizationCode:
 *                 type: string
 *                 description: Código de autorização fornecido pelo iFood.
 *                 example: "abc123xyz"
 *               authorizationCodeVerifier:
 *                 type: string
 *                 description: Código de verificação gerado anteriormente.
 *                 example: "o8ex6jxebboo7n1qeleft5gvmee7w7..."
 *     responses:
 *       200:
 *         description: Token de acesso gerado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token gerado e salvo com sucesso!"
 *                 integration:
 *                   type: object
 *                   properties:
 *                     access_token:
 *                       type: string
 *                       description: Token de acesso.
 *                       example: "your-access-token"
 *                     refresh_token:
 *                       type: string
 *                       description: Token para renovar o access token.
 *                       example: "your-refresh-token"
 *                     token_expires_at:
 *                       type: string
 *                       format: date-time
 *                       description: Data e hora de expiração do token.
 *                       example: "2024-12-31T23:59:59Z"
 *       400:
 *         description: Dados incompletos fornecidos na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dados incompletos na requisição."
 *       500:
 *         description: Erro ao gerar o token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao gerar o token."
 *                 error:
 *                   type: string
 *                   example: "Detalhes do erro técnico."
 */

/**
 * @swagger
 * /ifood/unlink:
 *   delete:
 *     summary: Remover integração.
 *     tags:
 *       - Integração - iFood
 *     responses:
 *       200:
 *         description: Integração removida.
 */