const { Item } = require("../models");
const paginationService = require("../services/paginationService");

const getItems = async (req, res) => {
  const { company_id } = req.user;

  if (!company_id) {
    return res.status(401).json({ error: "Acesso negado. Empresa não identificada." });
  }

  try {
    await paginationService(Item, {
      where: { company_id },
      attributes: ["id", "name", "description", "price", "available", "image"],
    })(req, res, () => {
      const formattedItems = res.pagination.data.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        available: item.available,
        image: item.image,
      }));

      res.status(200).json({
        currentPage: res.pagination.currentPage,
        totalPages: res.pagination.totalPages,
        totalItems: res.pagination.totalItems,
        itemsPerPage: res.pagination.itemsPerPage,
        data: formattedItems,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar itens." });
  }
};

const getItemById = async (req, res) => {
  const { company_id } = req.user;
  const { id } = req.params;

  try {
    const item = await Item.findOne({
      where: { id, company_id },
      attributes: ["id", "name", "description", "price", "available", "image"],
    });

    if (!item) {
      return res.status(404).json({ error: "Item não encontrado." });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar o item." });
  }
};

const createItem = async (req, res) => {
  const { name, price, available, image, description } = req.body;
  const { company_id } = req.user;

  try {
    if (!name || typeof price !== "number" || typeof available !== "boolean") {
      return res.status(400).json({
        error:
          "Os campos 'name', 'price' e 'available' são obrigatórios e devem ser válidos.",
      });
    }

    const newItem = await Item.create({
      name,
      price,
      available,
      image: image || null,
      description: description || null,
      company_id,
    });

    res.status(201).json({
      message: "Item criado com sucesso.",
      item: {
        id: newItem.id,
        name: newItem.name,
        description: newItem.description,
        price: newItem.price,
        available: newItem.available,
        image: newItem.image,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o item." });
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, available, image, description } = req.body;
  const { company_id } = req.user;

  try {
    const item = await Item.findOne({ where: { id, company_id } });

    if (!item) {
      return res.status(404).json({ error: "Item não encontrado." });
    }

    item.name = name || item.name;
    item.price = price !== undefined ? price : item.price;
    item.available = available !== undefined ? available : item.available;
    item.image = image || item.image;
    item.description = description || item.description;

    await item.save();

    res.status(200).json({
      message: "Item atualizado com sucesso.",
      item: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        available: item.available,
        image: item.image,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o item." });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  const { company_id } = req.user;

  try {
    const item = await Item.findOne({ where: { id, company_id } });

    if (!item) {
      return res.status(404).json({ error: "Item não encontrado." });
    }

    await item.destroy();

    res.status(200).json({
      message: "Item excluído com sucesso.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir o item." });
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
