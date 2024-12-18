/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Lista todos os clientes relacionados a uma empresa, incluindo os últimos 3 pedidos de cada cliente.
 *     tags:
 *       - Clientes
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Número da página para paginação.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Quantidade de clientes por página.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Lista de clientes relacionados à empresa retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 totalItems:
 *                   type: integer
 *                   example: 50
 *                 itemsPerPage:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: João Silva
 *                       email:
 *                         type: string
 *                         example: joao.silva@example.com
 *                       phone:
 *                         type: string
 *                         example: 11987654321
 *                       address:
 *                         type: object
 *                         properties:
 *                           street:
 *                             type: string
 *                             example: Rua Exemplo
 *                           city:
 *                             type: string
 *                             example: São Paulo
 *                           state:
 *                             type: string
 *                             example: SP
 *                           zip:
 *                             type: string
 *                             example: 12345-678
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-10T00:00:00.000Z"
 *                       orders:
 *                         type: array
 *                         description: Lista dos últimos 3 pedidos do cliente.
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 101
 *                             total:
 *                               type: number
 *                               format: float
 *                               example: 150.75
 *                             status:
 *                               type: string
 *                               example: "completed"
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2024-12-10T10:00:00.000Z"
 *       401:
 *         description: Token inválido ou não fornecido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Token não autorizado.
 *       500:
 *         description: Erro ao buscar os clientes relacionados à empresa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao buscar clientes relacionados à empresa.
 */

/**
 * @swagger
 * /customers/login:
 *   post:
 *     summary: Realiza a autenticação de um cliente.
 *     tags:
 *       - Clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao.silva@example.com
 *               phone:
 *                 type: string
 *                 example: 11987654321
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
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
 *                 message:
 *                   type: string
 *                   example: Login realizado com sucesso.
 *       401:
 *         description: Credenciais inválidas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário ou senha inválidos.
 *       500:
 *         description: Erro interno no servidor ao realizar login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao fazer login.
 */

/**
 * @swagger
 * /customers/register:
 *   post:
 *     summary: Registra um novo cliente.
 *     tags:
 *       - Clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - cpf
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao.silva@example.com
 *               password:
 *                 type: string
 *                 example: senha123
 *               cpf:
 *                 type: string
 *                 example: 12345678901
 *               address:
 *                 type: object
 *                 example: { "street": "Rua Exemplo", "number": "123", "city": "São Paulo", "state": "SP", "cep": "11111-111", "lat": "-41.12313131", "lng": "-41.12313131", "neighborhood": "Morumbi", "complement": "apto 22" }
 *               phone:
 *                 type: string
 *                 example: 11987654321
 *     responses:
 *       201:
 *         description: Cliente registrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: João Silva
 *                     email:
 *                       type: string
 *                       example: joao.silva@example.com
 *                     cpf:
 *                       type: string
 *                       example: 12345678901
 *                     phone:
 *                       type: string
 *                       example: 11987654321
 *                     address:
 *                       type: object
 *                       example: { "street": "Rua Exemplo", "number": "123", "city": "São Paulo", "state": "SP", "cep": "11111-111", "lat": "-41.12313131", "lng": "-41.12313131", "neighborhood": "Morumbi", "complement": "apto 22" }
 *                 message:
 *                   type: string
 *                   example: Cliente criado com sucesso!
 *       400:
 *         description: Erro de validação.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: CPF Já registrado
 *       500:
 *         description: Erro ao criar o cliente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while creating the customer.
 */
