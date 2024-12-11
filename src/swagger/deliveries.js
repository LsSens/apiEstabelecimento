/**
 * @swagger
 * /deliveries:
 *   get:
 *     summary: Retorna todos os deliveries associados a uma empresa.
 *     tags:
 *       - Deliveries
 *     responses:
 *       200:
 *         description: Lista de deliveries associados à empresa.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   delivery_status:
 *                     type: string
 *                     example: "PENDING"
 *                   total_cost:
 *                     type: number
 *                     example: 200.50
 *                   total_fee:
 *                     type: number
 *                     example: 15.00
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-10T16:43:02.115Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-10T16:43:02.115Z"
 *                   orders:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 101
 *                         total:
 *                           type: number
 *                           example: 100.50
 *                         items:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               name:
 *                                 type: string
 *                                 example: "Item A"
 *                               price:
 *                                 type: number
 *                                 example: 50.00
 *                               quantity:
 *                                 type: integer
 *                                 example: 2
 */

/**
 * @swagger
 * /deliveries:
 *   post:
 *     summary: Cria um novo delivery e relaciona orders a ele.
 *     tags:
 *       - Deliveries
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_id:
 *                 type: integer
 *                 example: 1
 *               orders:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [101, 102]
 *               total_cost:
 *                 type: number
 *                 example: 200.50
 *               total_fee:
 *                 type: number
 *                 example: 15.00
 *     responses:
 *       201:
 *         description: Delivery criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Delivery criado com sucesso."
 *                 delivery:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     company_id:
 *                       type: integer
 *                       example: 1
 *                     delivery_status:
 *                       type: string
 *                       example: "PENDING"
 *                     total_cost:
 *                       type: number
 *                       example: 200.50
 *                     total_fee:
 *                       type: number
 *                       example: 15.00
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-10T16:43:02.115Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-10T16:43:02.115Z"
 *                     orders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 101
 *                           total:
 *                             type: number
 *                             example: 100.50
 *                           items:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 1
 *                                 name:
 *                                   type: string
 *                                   example: "Item A"
 *                                 price:
 *                                   type: number
 *                                   example: 50.00
 *                                 quantity:
 *                                   type: integer
 *                                   example: 2
 */

/**
 * @swagger
 * /deliveries/{id}:
 *   get:
 *     summary: Retorna os detalhes de um delivery específico.
 *     tags:
 *       - Deliveries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do delivery.
 *     responses:
 *       200:
 *         description: Detalhes do delivery solicitado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 delivery_status:
 *                   type: string
 *                   example: "PENDING"
 *                 total_cost:
 *                   type: number
 *                   example: 200.50
 *                 total_fee:
 *                   type: number
 *                   example: 15.00
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-10T16:43:02.115Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-10T16:43:02.115Z"
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       total:
 *                         type: number
 *                         example: 100.50
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
 *                               example: "Item A"
 *                             price:
 *                               type: number
 *                               example: 50.00
 *                             quantity:
 *                               type: integer
 *                               example: 2
 *       404:
 *         description: Delivery não encontrado.
 */
