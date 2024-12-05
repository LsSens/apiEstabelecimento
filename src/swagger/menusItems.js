/**
 * @swagger
 * /items:
 *   get:
 *     summary: Retorna todos os itens associados ao company_id do usuário autenticado.
 *     tags:
 *       - Cardápio - Items
 *     responses:
 *       200:
 *         description: Lista de itens associados ao company_id.
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
 *                   name:
 *                     type: string
 *                     example: Coca-Cola
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 5.99
 *                   available:
 *                     type: boolean
 *                     example: true
 *                   image:
 *                     type: string
 *                     example: https://example.com/image.png
 *       500:
 *         description: Erro ao buscar itens.
 */

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Atualiza um item específico pelo ID.
 *     tags:
 *       - Cardápio - Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do item a ser atualizado.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Coca-Cola Zero
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 6.99
 *               available:
 *                 type: boolean
 *                 example: false
 *               image:
 *                 type: string
 *                 example: https://example.com/new-image.png
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item atualizado com sucesso.
 *                 item:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Coca-Cola Zero
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 6.99
 *                     available:
 *                       type: boolean
 *                       example: false
 *                     image:
 *                       type: string
 *                       example: https://example.com/new-image.png
 *       404:
 *         description: Item não encontrado.
 *       500:
 *         description: Erro ao atualizar o item.
 */

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Exclui um item específico pelo ID.
 *     tags:
 *       - Cardápio - Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do item a ser excluído.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item excluído com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item excluído com sucesso.
 *       404:
 *         description: Item não encontrado.
 *       500:
 *         description: Erro ao excluir o item.
 */
