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
      attributes: ["id", "name", "price", "available", "image"],
    });

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar itens." });
  }
});

//Atualizar itens
router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, price, available, image } = req.body;
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

    await item.save();

    res.status(200).json({
      message: "Item atualizado com sucesso.",
      item: {
        id: item.id,
        name: item.name,
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
