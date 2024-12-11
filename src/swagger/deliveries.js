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
 *                     example: 8
 *                   company_id:
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
 *                     example: "2024-12-11T05:26:46.605Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-11T05:26:46.605Z"
 *                   deletedAt:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                     example: null
 *                   orders:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 9
 *                         customer_id:
 *                           type: integer
 *                           example: 1
 *                         total:
 *                           type: number
 *                           example: 25.97
 *                         status:
 *                           type: string
 *                           example: "PENDING"
 *                         company_id:
 *                           type: integer
 *                           example: 1
 *                         payment_method:
 *                           type: string
 *                           example: "credit_card"
 *                         delivery_fee:
 *                           type: number
 *                           example: 5.00
 *                         notes:
 *                           type: string
 *                           example: "Sem cebola"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-12-10T16:34:59.818Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-12-10T16:34:59.818Z"
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
 *                                 example: "Coca-Cola Zero"
 *                               price:
 *                                 type: number
 *                                 example: 6.99
 *                               quantity:
 *                                 type: integer
 *                                 example: 2
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
 *                   example: 8
 *                 company_id:
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
 *                   example: "2024-12-11T05:26:46.605Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-11T05:26:46.605Z"
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 9
 *                       total:
 *                         type: number
 *                         example: 25.97
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
 *                               type: number
 *                               example: 6.99
 *                             quantity:
 *                               type: integer
 *                               example: 2
 *       404:
 *         description: Delivery não encontrado.
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
 *                 example: [9, 10]
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
 *                       example: 8
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
 *                       example: "2024-12-11T05:26:46.605Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-11T05:26:46.605Z"
 *                     orders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 9
 *                           total:
 *                             type: number
 *                             example: 25.97
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
 *                                   example: "Coca-Cola Zero"
 *                                 price:
 *                                   type: number
 *                                   example: 6.99
 *                                 quantity:
 *                                   type: integer
 *                                   example: 2
 */