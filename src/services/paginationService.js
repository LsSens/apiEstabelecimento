const paginationService = (model, options = {}) => async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await model.findAndCountAll({
            ...options,
            limit,
            offset,
            raw: true,
            nest: true,
        });

        const totalPages = Math.ceil(count / limit);

        res.pagination = {
            totalItems: count,
            totalPages,
            currentPage: page,
            itemsPerPage: limit,
            data: rows,
        };

        next();
    } catch (error) {
        console.error("Erro no serviço de paginação:", error);
        res.status(500).json({ error: "Erro no serviço de paginação." });
    }
};

module.exports = paginationService;
