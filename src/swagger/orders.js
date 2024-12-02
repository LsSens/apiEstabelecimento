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
 *                 example: 123
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     item_id:
 *                       type: integer
 *                       example: 101
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *               total:
 *                 type: number
 *                 example: 25.97
 *               payment_method:
 *                 type: string
 *                 example: credit_card
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order_id:
 *                   type: integer
 *                   example: 456
 *                 status:
 *                   type: string
 *                   example: PENDING
 *                 message:
 *                   type: string
 *                   example: "Order created and waiting for acceptance"
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
 *                   order_id:
 *                     type: integer
 *                     example: 456
 *                   customer_id:
 *                     type: integer
 *                     example: 123
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         item_id:
 *                           type: integer
 *                           example: 101
 *                         quantity:
 *                           type: integer
 *                           example: 2
 *                   total:
 *                     type: number
 *                     example: 25.97
 *                   status:
 *                     type: string
 *                     example: PENDING
 */
/**
 * @swagger
 * /orders/{order_id}/accept:
 *   put:
 *     summary: Estabelecimento aceita o pedido.
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - name: order_id
 *         in: path
 *         required: true
 *         description: ID do pedido.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido aceito com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order_id:
 *                   type: integer
 *                   example: 456
 *                 status:
 *                   type: string
 *                   example: PREPARING
 *                 message:
 *                   type: string
 *                   example: "Order accepted and preparing"
 */
/**
 * @swagger
 * /orders/{order_id}/status:
 *   put:
 *     summary: Atualiza o status do pedido.
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - name: order_id
 *         in: path
 *         required: true
 *         description: ID do pedido.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: READY_FOR_PICKUP
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso.
 */
/**
 * @swagger
 * /orders/{order_id}/cancel:
 *   put:
 *     summary: Cancela um pedido antes de ser aceito.
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - name: order_id
 *         in: path
 *         required: true
 *         description: ID do pedido.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido cancelado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order_id:
 *                   type: integer
 *                   example: 456
 *                 status:
 *                   type: string
 *                   example: CANCELED
 *                 message:
 *                   type: string
 *                   example: "Order canceled successfully"
 */
