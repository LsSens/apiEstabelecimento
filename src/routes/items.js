const express = require("express");
const { Item } = require("../../models");
const authenticateToken = require("../middlewares/authenticateToken");
const router = express.Router();

// Ver itens
router.get("/", authenticateToken, async (req, res) => {
  const { company_id } = req.user;

  try {
    const items = await Item.findAll({
      where: { company_id },
      attributes: ["id", "name", "description", "price", "available", "image"],
    });

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar itens." });
  }
});

// Ver item por id
router.get("/:id", authenticateToken, async (req, res) => {
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
});

// Criar item
router.post("/", authenticateToken, async (req, res) => {
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
});

//Atualizar itens
router.put("/:id", authenticateToken, async (req, res) => {
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
});

//Deletar item
router.delete("/:id", authenticateToken, async (req, res) => {
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
});

module.exports = router;
