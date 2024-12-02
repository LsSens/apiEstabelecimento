/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Retorna o cardápio completo do estabelecimento.
 *     tags:
 *       - Cardápio
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
 *                   category_id:
 *                     type: integer
 *                     example: 1
 *                   category_name:
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
 *     summary: Adiciona um novo item ao cardápio.
 *     tags:
 *       - Cardápio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Coca-Cola
 *               price:
 *                 type: number
 *                 example: 5.99
 *               available:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Item adicionado com sucesso.
 */

/**
 * @swagger
 * /menu/{item_id}:
 *   put:
 *     summary: Atualiza informações de um item do cardápio.
 *     tags:
 *       - Cardápio
 *     parameters:
 *       - name: item_id
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
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Coca-Cola
 *               price:
 *                 type: number
 *                 example: 5.99
 *               available:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso.
 */
/**
 * @swagger
 * /menu/{item_id}:
 *   delete:
 *     summary: Remove um item do cardápio.
 *     tags:
 *       - Cardápio
 *     parameters:
 *       - name: item_id
 *         in: path
 *         required: true
 *         description: ID do item a ser removido.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item removido com sucesso.
 */
