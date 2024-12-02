/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Retorna o cardápio completo do estabelecimento.
 *     tags:
 *       - Cardápio - Menus
 *     responses:
 *       200:
 *         description: Lista de categorias e itens.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   menu_id:
 *                     type: integer
 *                     example: 1
 *                   menu_name:
 *                     type: string
 *                     example: Bebidas
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         item_id:
 *                           type: integer
 *                           example: 101
 *                         name:
 *                           type: string
 *                           example: Coca-Cola
 *                         price:
 *                           type: number
 *                           example: 5.99
 *                         available:
 *                           type: boolean
 *                           example: true
 */
/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Adiciona um novo menu ao cardápio.
 *     tags:
 *       - Cardápio - Menus
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               menu_name:
 *                 type: string
 *                 example: Bebidas
 *     responses:
 *       201:
 *         description: Menu adicionado com sucesso.
 */

/**
 * @swagger
 * /menu/{menu_id}:
 *   put:
 *     summary: Atualiza informações de um menu do cardápio.
 *     tags:
 *       - Cardápio - Menus
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
 *             type: object
 *             properties:
 *               menu_name:
 *                 type: string
 *                 example: Bebidas
 *     responses:
 *       200:
 *         description: Menu atualizado com sucesso.
 */
/**
 * @swagger
 * /menu/{menu_id}:
 *   delete:
 *     summary: Remove um menu do cardápio.
 *     tags:
 *       - Cardápio - Menus
 *     parameters:
 *       - name: menu_id
 *         in: path
 *         required: true
 *         description: ID do menu a ser removido.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Menu removido com sucesso.
 */
