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
 *                 example: user@example.com
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
 *                 permissions:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: admin
 *       401:
 *         description: Credenciais inválidas.
 */
