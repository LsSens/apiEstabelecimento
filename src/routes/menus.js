const express = require("express");
const { Menu, Item } = require("@models");
const authenticateToken = require("../middlewares/authenticateToken");
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  const { company_id } = req.user;

  try {
    const menus = await Menu.findAll({
      where: { company_id },
      include: [
        {
          model: Item,
          as: "items",
          attributes: ["id", "name", "price", "available"],
        },
      ],
    });

    // Formatar a resposta
    const formattedMenus = menus.map((menu) => ({
      menu_id: menu.id,
      menu_name: menu.menu_name,
      items: menu.items.map((item) => ({
        item_id: item.id,
        name: item.name,
        price: item.price,
        available: item.available,
      })),
    }));

    res.status(200).json(formattedMenus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar os menus." });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { menu_name } = req.body;

  try {
    const { company_id } = req.user;
    if (!company_id) {
      return res
        .status(403)
        .json({ error: "Usuário não está associado a uma empresa." });
    }

    // Cria o menu
    const newMenu = await Menu.create({
      menu_name,
      company_id,
    });

    res.status(201).json({
      message: "Menu criado com sucesso.",
      menu: newMenu,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o menu." });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { menu_name } = req.body;
  const { company_id } = req.user;

  try {
    const menu = await Menu.findOne({ where: { id } });

    if (!menu) {
      return res.status(404).json({ error: "Menu não encontrado." });
    }

    // Verificar se o menu pertence ao mesmo company_id do usuário autenticado
    if (menu.company_id !== company_id) {
      return res.status(403).json({ error: "Menu não encontrado." });
    }

    menu.menu_name = menu_name;
    await menu.save();

    res.status(200).json({
      message: "Menu atualizado com sucesso.",
      menu,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o menu." });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { company_id } = req.user;

  try {
    const menu = await Menu.findOne({ where: { id } });

    if (!menu) {
      return res.status(404).json({ error: "Menu não encontrado." });
    }

    if (menu.company_id !== company_id) {
      return res.status(403).json({ error: "Menu não encontrado." });
    }

    // Excluir o menu
    await menu.destroy();

    res.status(200).json({
      message: "Menu excluído com sucesso.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir o menu." });
  }
});

module.exports = router;
