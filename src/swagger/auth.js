/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza a autenticação do usuário.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@company.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Token de autenticação retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: jwt_token_gerado
 *                 expiresIn:
 *                   type: number
 *                   example: 3600
 *                 permissions:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: admin
 *                 message:
 *                   type: string
 *                   example: Login realizado com sucesso.
 *       401:
 *         description: Credenciais inválidas.
 */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário e cria uma empresa associada.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@company.com
 *               password:
 *                 type: string
 *                 example: senha123
 *               name:
 *                 type: string
 *                 example: Admin User
 *               phone:
 *                 type: string
 *                 example: 123456789
 *               company:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Empresa Exemplo
 *                   cnpj:
 *                     type: string
 *                     example: 12345678000195
 *                   address:
 *                     type: object
 *                     example: { "street": "Rua Exemplo", "number": "123", "city": "São Paulo", "state": "SP", "cep": "11111-111", "lat": "-41.12313131", "lng": "-41.12313131", "neighborhood": "Morumbi", "complement": "apto 22" }
 *     responses:
 *       201:
 *         description: Usuário e empresa registrados com sucesso.
 *       400:
 *         description: Erro de validação.
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Solicita redefinição de senha para o usuário.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@example.com
 *     responses:
 *       200:
 *         description: E-mail de redefinição enviado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: E-mail de redefinição enviado com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário não encontrado.
 *       500:
 *         description: Erro ao enviar o e-mail de redefinição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao enviar e-mail de redefinição de senha.
 */

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Redefine a senha do usuário com base no token de redefinição.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: eyJlbWFpbCI6ICJ1c3VhcmlvQGV4YW1wbGUuY29tIiwgImV4cGlyZXMiOiAiMjAyNC0xMi0wOSAyMjowMDowMCJ9
 *               newPassword:
 *                 type: string
 *                 example: novaSenha123
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Senha redefinida com sucesso.
 *       400:
 *         description: Erro de validação do token ou do e-mail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: O token expirou.
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário não encontrado.
 *       500:
 *         description: Erro ao redefinir a senha.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao redefinir a senha.
 */
