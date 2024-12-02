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
 *                     example: { "street": "Rua Exemplo", "number": "123", "city": "São Paulo", "state": "SP" }
 *     responses:
 *       201:
 *         description: Usuário e empresa registrados com sucesso.
 *       400:
 *         description: Erro de validação.
 */
