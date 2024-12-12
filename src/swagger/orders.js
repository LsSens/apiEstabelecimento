/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retorna uma lista de pedidos com status e detalhes.
 *     tags:
 *       - Pedidos
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
 *         description: Quantidade de pedidos por página.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Lista de pedidos com detalhes.
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
 *                         example: 9
 *                       deliver_id:
 *                         type: integer
 *                         example: 19
 *                       customer_id:
 *                         type: integer
 *                         example: 1
 *                       total:
 *                         type: number
 *                         example: 25.97
 *                       status:
 *                         type: string
 *                         example: PENDING
 *                       company_id:
 *                         type: integer
 *                         example: 1
 *                       payment_method:
 *                         type: string
 *                         example: credit_card
 *                       delivery_fee:
 *                         type: number
 *                         example: 5.00
 *                       notes:
 *                         type: string
 *                         example: "Sem cebola"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-10T16:34:59.818Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-10T16:34:59.818Z"
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             name:
 *                               type: string
 *                               example: "Coca-Cola Zero"
 *                             price:
 *                               type: string
 *                               example: "6.99"
 *                             quantity:
 *                               type: integer
 *                               example: 2
 *                       customer:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "João Silva"
 *                           email:
 *                             type: string
 *                             example: "joao.silva@example.com"
 *                           address:
 *                             type: object
 *                             properties:
 *                               street:
 *                                 type: string
 *                                 example: "Rua Exemplo"
 *                               number:
 *                                 type: string
 *                                 example: "123"
 *                               city:
 *                                 type: string
 *                                 example: "São Paulo"
 *                               state:
 *                                 type: string
 *                                 example: "SP"
 *                               cep:
 *                                 type: string
 *                                 example: "11111-111"
 *                               lat:
 *                                 type: string
 *                                 example: "-41.12313131"
 *                               lng:
 *                                 type: string
 *                                 example: "-41.12313131"
 *                               neighborhood:
 *                                 type: string
 *                                 example: "Morumbi"
 *                               complement:
 *                                 type: string
 *                                 example: "apto 22"
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
 *         description: Erro ao buscar os pedidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao buscar pedidos.
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Lança um novo pedido (manual ou integração).
 *     tags:
 *       - Pedidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "João Silva"
 *                   email:
 *                     type: string
 *                     example: "joao.silva@example.com"
 *                   phone:
 *                     type: string
 *                     example: "11999999999"
 *                   address:
 *                     type: object
 *                     properties:
 *                       street:
 *                         type: string
 *                         example: "Rua Exemplo"
 *                       number:
 *                         type: string
 *                         example: "123"
 *                       city:
 *                         type: string
 *                         example: "São Paulo"
 *                       state:
 *                         type: string
 *                         example: "SP"
 *                       cep:
 *                         type: string
 *                         example: "11111-111"
 *                       lat:
 *                         type: string
 *                         example: "-41.12313131"
 *                       lng:
 *                         type: string
 *                         example: "-41.12313131"
 *                       neighborhood:
 *                         type: string
 *                         example: "Morumbi"
 *                       complement:
 *                         type: string
 *                         example: "apto 22"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     item_id:
 *                       type: integer
 *                       example: 2
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *               total:
 *                 type: number
 *                 example: 25.97
 *               payment_method:
 *                 type: string
 *                 example: credit_card
 *               delivery_fee:
 *                 type: number
 *                 example: 5.00
 *               notes:
 *                 type: string
 *                 example: "Sem cebola"
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 11
 *                 customer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "João Silva"
 *                     email:
 *                       type: string
 *                       example: "joao.silva@example.com"
 *                     address:
 *                       type: object
 *                       properties:
 *                         street:
 *                           type: string
 *                           example: "Rua Exemplo"
 *                         number:
 *                           type: string
 *                           example: "123"
 *                         city:
 *                           type: string
 *                           example: "São Paulo"
 *                         state:
 *                           type: string
 *                           example: "SP"
 *                         cep:
 *                           type: string
 *                           example: "11111-111"
 *                         lat:
 *                           type: string
 *                           example: "-41.12313131"
 *                         lng:
 *                           type: string
 *                           example: "-41.12313131"
 *                         neighborhood:
 *                           type: string
 *                           example: "Morumbi"
 *                         complement:
 *                           type: string
 *                           example: "apto 22"
 *                 total:
 *                   type: number
 *                   example: 25.97
 *                 status:
 *                   type: string
 *                   example: PENDING
 *                 company_id:
 *                   type: integer
 *                   example: 1
 *                 payment_method:
 *                   type: string
 *                   example: credit_card
 *                 delivery_fee:
 *                   type: number
 *                   example: 5.00
 *                 notes:
 *                   type: string
 *                   example: "Sem cebola"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-10T16:43:02.115Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-10T16:43:02.115Z"
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       name:
 *                         type: string
 *                         example: "Coca-Cola Zero"
 *                       price:
 *                         type: string
 *                         example: "6.99"
 *                       quantity:
 *                         type: integer
 *                         example: 2
 */

/**
 * @swagger
 * /orders/{orderId}:
 *   delete:
 *     summary: Cancela um pedido alterando o status para "CANCELED" e adiciona a data no campo deletedAt.
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - name: orderId
 *         in: path
 *         description: ID do pedido a ser cancelado.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Pedido cancelado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pedido cancelado com sucesso.
 *       404:
 *         description: Pedido não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Pedido não encontrado.
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
 *         description: Erro ao cancelar o pedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao cancelar o pedido.
 */
