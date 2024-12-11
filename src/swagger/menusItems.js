/**
 * @swagger
 * /items:
 *   get:
 *     summary: Retorna todos os itens associados ao company_id do usuário autenticado.
 *     tags:
 *       - Cardápio - Items
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
 *         description: Lista de itens associados ao company_id.
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
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Coca-Cola
 *                       description:
 *                         type: string
 *                         example: Very good
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 5.99
 *                       available:
 *                         type: boolean
 *                         example: true
 *                       image:
 *                         type: string
 *                         example: https://example.com/image.png
 *       500:
 *         description: Erro ao buscar itens.
 */

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Retorna um item específico pelo ID.
 *     tags:
 *       - Cardápio - Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do item a ser buscado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do item solicitado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Coca-Cola
 *                 description:
 *                   type: string
 *                   example: Very good
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 5.99
 *                 available:
 *                   type: boolean
 *                   example: true
 *                 image:
 *                   type: string
 *                   example: https://example.com/image.png
 *       404:
 *         description: Item não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Item não encontrado.
 *       500:
 *         description: Erro ao buscar o item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao buscar o item.
 */

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Criar um novo item
 *     tags:
 *       - Cardápio - Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do item (obrigatório).
 *                 example: Coca-Cola
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Preço do item (obrigatório).
 *                 example: 5.99
 *               available:
 *                 type: boolean
 *                 description: Disponibilidade do item (obrigatório).
 *                 example: true
 *               description:
 *                 type: string
 *                 description: Descrição opcional do item.
 *                 example: Bebida gelada
 *               image:
 *                 type: string
 *                 description: URL ou base64 da imagem opcional do item.
 *                 example: https://example.com/image.jpg
 *     responses:
 *       201:
 *         description: Item criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item criado com sucesso.
 *                 item:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID do item criado.
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: Nome do item.
 *                       example: Coca-Cola
 *                     description:
 *                       type: string
 *                       description: Descrição do item.
 *                       example: Bebida gelada
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: Preço do item.
 *                       example: 5.99
 *                     available:
 *                       type: boolean
 *                       description: Disponibilidade do item.
 *                       example: true
 *                     image:
 *                       type: string
 *                       description: Imagem associada ao item.
 *                       example: https://example.com/image.jpg
 *       400:
 *         description: Erro de validação nos dados enviados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Os campos 'name', 'price' e 'available' são obrigatórios e devem ser válidos.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao criar o item.
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
 *               description:
 *                 type: string
 *                 example: Very good
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
 *                     description:
 *                       type: string
 *                       example: Very good
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
