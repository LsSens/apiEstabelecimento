const express = require("express");
const { Menu, Item } = require("@models");
const authenticateToken = require("../middlewares/authenticateToken");
const router = express.Router();

router.post("/:menu_id/items", authenticateToken, async (req, res) => {
  const { menu_id } = req.params;
  const items = req.body;
  const { company_id } = req.user;

  try {
    const menu = await Menu.findOne({ where: { id: menu_id } });

    if (!menu) {
      return res.status(404).json({ error: "Menu não encontrado." });
    }

    if (menu.company_id !== company_id) {
      return res.status(403).json({
        error: "Menu não encontrado.",
      });
    }

    // Validar itens recebidos
    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ error: "O corpo da requisição deve ser um array de itens." });
    }

    const invalidItems = items.filter(
      (item) =>
        !item.name ||
        typeof item.price !== "number" ||
        typeof item.available !== "boolean"
    );
    if (invalidItems.length > 0) {
      return res.status(400).json({
        error: "Alguns itens possuem dados inválidos.",
        details: invalidItems,
      });
    }

    // Criar itens no menu
    const createdItems = await Promise.all(
      items.map(async (item) =>
        Item.create({
          name: item.name,
          price: item.price,
          available: item.available,
          menu_id,
        })
      )
    );

    res.status(201).json({
      message: "Item(ns) criado(s) com sucesso.",
      items: createdItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o(s) item(ns)." });
  }
});

router.put("/:menu_id/item/:item_id", authenticateToken, async (req, res) => {
  const { menu_id, item_id } = req.params; // menu_id e item_id
  const { name, price, available } = req.body; // Dados para atualização
  const { company_id } = req.user; // company_id do usuário autenticado

  try {
    // Verificar se o menu existe
    const menu = await Menu.findOne({ where: { id: menu_id } });

    if (!menu) {
      return res.status(404).json({ error: "Menu não encontrado." });
    }

    // Verificar se o menu pertence à empresa do usuário autenticado
    if (menu.company_id !== company_id) {
      return res.status(403).json({
        error: "Item não encontrado neste menu.",
      });
    }

    // Verificar se o item existe e está associado ao menu
    const item = await Item.findOne({
      where: { id: item_id, menu_id },
    });

    if (!item) {
      return res.status(404).json({ error: "Item não encontrado neste menu." });
    }

    // Atualizar o item
    item.name = name || item.name;
    item.price = price !== undefined ? price : item.price;
    item.available = available !== undefined ? available : item.available;

    await item.save();

    res.status(200).json({
      message: "Item atualizado com sucesso.",
      item,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o item." });
  }
});

router.delete(
  "/:menu_id/item/:item_id",
  authenticateToken,
  async (req, res) => {
    const { menu_id, item_id } = req.params; // menu_id e item_id
    const { company_id } = req.user; // company_id do usuário autenticado

    try {
      // Verificar se o menu existe
      const menu = await Menu.findOne({ where: { id: menu_id } });

      if (!menu) {
        return res.status(404).json({ error: "Menu não encontrado." });
      }

      // Verificar se o menu pertence à empresa do usuário autenticado
      if (menu.company_id !== company_id) {
        return res.status(403).json({
          error: "Item não encontrado neste menu.",
        });
      }

      // Verificar se o item existe e está associado ao menu
      const item = await Item.findOne({
        where: { id: item_id, menu_id },
      });

      if (!item) {
        return res
          .status(404)
          .json({ error: "Item não encontrado neste menu." });
      }

      // Deletar o item
      await item.destroy();

      res.status(200).json({
        message: "Item deletado com sucesso.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar o item." });
    }
  }
);

module.exports = router;
