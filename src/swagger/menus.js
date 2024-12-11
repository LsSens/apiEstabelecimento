/**
 * @swagger
 * /menus:
 *   get:
 *     summary: Retorna o cardápio completo do estabelecimento.
 *     tags:
 *       - Cardápio - Menus
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
 *         description: Quantidade de itens por página.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Lista de categorias e itens paginada.
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
 *                       menu_id:
 *                         type: integer
 *                         example: 1
 *                       menu_name:
 *                         type: string
 *                         example: Bebidas
 *                       menu_image:
 *                         type: string
 *                         example: https://example.com/menu1.jpg
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             item_id:
 *                               type: integer
 *                               example: 101
 *                             name:
 *                               type: string
 *                               example: Coca-Cola
 *                             price:
 *                               type: number
 *                               example: 5.99
 *                             available:
 *                               type: boolean
 *                               example: true
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /menus/{menu_id}:
 *   get:
 *     summary: Menu detalhado.
 *     tags:
 *       - Cardápio - Menus
 *     parameters:
 *       - name: menu_id
 *         in: path
 *         required: true
 *         description: ID do menu.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de categorias e itens.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 menu_id:
 *                   type: integer
 *                   example: 2
 *                 menu_name:
 *                   type: string
 *                   example: Bebidas
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       item_id:
 *                         type: integer
 *                         example: 3
 *                       name:
 *                         type: string
 *                         example: Coca-Cola
 *                       price:
 *                         type: string
 *                         example: "5.99"
 *                       available:
 *                         type: boolean
 *                         example: true
 *       403:
 *         description: Permissão negada.
 *       404:
 *         description: Menu ou item não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
/**
 * @swagger
 * /menus:
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
 *               image:
 *                 type: string
 *                 nullable: true
 *                 example: data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA
 *     responses:
 *       201:
 *         description: Menu adicionado com sucesso.
 */

/**
 * @swagger
 * /menus/{menu_id}/items:
 *   post:
 *     summary: Adiciona itens ao menu.
 *     tags:
 *       - Cardápio - Menus
 *     parameters:
 *       - name: menu_id
 *         in: path
 *         required: true
 *         description: ID do menu onde os itens serão adicionados.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 description: Lista de itens a serem adicionados ao menu.
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Nome do item.
 *                       example: Coca-Cola
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: Preço do item.
 *                       example: 5.99
 *                     available:
 *                       type: boolean
 *                       description: Indica se o item está disponível.
 *                       example: true
 *                     image:
 *                       type: string
 *                       format: uri
 *                       description: URL da imagem do item (opcional).
 *                       example: https://example.com/image.png
 *     responses:
 *       201:
 *         description: Itens adicionados ao menu com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Itens adicionados ao menu com sucesso.
 *                 items:
 *                   type: array
 *                   description: Lista de itens adicionados.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID do item.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Nome do item.
 *                         example: Coca-Cola
 *                       price:
 *                         type: number
 *                         format: float
 *                         description: Preço do item.
 *                         example: 5.99
 *                       available:
 *                         type: boolean
 *                         description: Indica se o item está disponível.
 *                         example: true
 *                       image:
 *                         type: string
 *                         format: uri
 *                         description: URL da imagem do item.
 *                         example: https://example.com/image.png
 *       400:
 *         description: Requisição inválida. O payload pode estar incorreto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Os itens devem ser válidos."
 *       404:
 *         description: Menu não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Menu não encontrado."
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao adicionar itens ao menu."
 */

/**
 * @swagger
 * /menus/{menu_id}:
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
 *               image:
 *                 type: string
 *                 nullable: true
 *                 example: data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA
 *     responses:
 *       200:
 *         description: Menu atualizado com sucesso.
 */
/**
 * @swagger
 * /menus/{menu_id}:
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
