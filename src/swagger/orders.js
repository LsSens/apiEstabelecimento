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
 *               customer_id:
 *                 type: integer
 *                 example: 1
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
 *                 customer_id:
 *                   type: integer
 *                   example: 1
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
 * /orders:
 *   get:
 *     summary: Retorna uma lista de pedidos com status e detalhes.
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos com detalhes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 9
 *                   customer_id:
 *                     type: integer
 *                     example: 1
 *                   total:
 *                     type: number
 *                     example: 25.97
 *                   status:
 *                     type: string
 *                     example: PENDING
 *                   company_id:
 *                     type: integer
 *                     example: 1
 *                   payment_method:
 *                     type: string
 *                     example: credit_card
 *                   delivery_fee:
 *                     type: number
 *                     example: 5.00
 *                   notes:
 *                     type: string
 *                     example: "Sem cebola"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-10T16:34:59.818Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-10T16:34:59.818Z"
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Coca-Cola Zero"
 *                         price:
 *                           type: string
 *                           example: "6.99"
 *                         quantity:
 *                           type: integer
 *                           example: 2
 *                   customer:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "João Silva"
 *                       email:
 *                         type: string
 *                         example: "joao.silva@example.com"
 *                       address:
 *                         type: object
 *                         properties:
 *                           street:
 *                             type: string
 *                             example: "Rua Exemplo"
 *                           number:
 *                             type: string
 *                             example: "123"
 *                           city:
 *                             type: string
 *                             example: "São Paulo"
 *                           state:
 *                             type: string
 *                             example: "SP"
 *                           cep:
 *                             type: string
 *                             example: "11111-111"
 *                           lat:
 *                             type: string
 *                             example: "-41.12313131"
 *                           lng:
 *                             type: string
 *                             example: "-41.12313131"
 *                           neighborhood:
 *                             type: string
 *                             example: "Morumbi"
 *                           complement:
 *                             type: string
 *                             example: "apto 22"
 */
