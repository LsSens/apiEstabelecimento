/**
 * @swagger
 * /menu/{menu_id}/items:
 *   post:
 *     summary: Adiciona um novo item ao menu.
 *     tags:
 *       - Cardápio - Items
 *     parameters:
 *       - name: menu_id
 *         in: path
 *         required: true
 *         description: ID do menu a ser atualizado.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Coca-Cola
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 5.99
 *                 available:
 *                   type: boolean
 *                   example: true
 *     responses:
 *       201:
 *         description: Item adicionado com sucesso.
 */
/**
 * @swagger
 * /menu/{menu_id}/item/{item_id}:
 *   put:
 *     summary: Atualiza os dados de um item no menu.
 *     tags:
 *       - Cardápio - Items
 *     parameters:
 *       - name: menu_id
 *         in: path
 *         required: true
 *         description: ID do menu.
 *         schema:
 *           type: integer
 *       - name: item_id
 *         in: path
 *         required: true
 *         description: ID do item no menu.
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
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso.
 *       403:
 *         description: Permissão negada.
 *       404:
 *         description: Menu ou item não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
/**
 * @swagger
 * /menu/{menu_id}/item/{item_id}:
 *   delete:
 *     summary: Remove um item do menu.
 *     tags:
 *       - Cardápio - Items
 *     parameters:
 *       - name: menu_id
 *         in: path
 *         required: true
 *         description: ID do menu.
 *         schema:
 *           type: integer
 *       - name: item_id
 *         in: path
 *         required: true
 *         description: ID do item no menu.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item deletado com sucesso.
 *       403:
 *         description: Permissão negada.
 *       404:
 *         description: Menu ou item não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
