const express = require("express");
const { Menus, Item } = require("../../models");
const authenticateToken = require("../middlewares/authenticateToken");
const uploadToImgur = require("../images/imgur");
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  const { company_id } = req.user;

  try {
    const menus = await Menus.findAll({
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
      menu_image: menu.image,
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

router.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { company_id } = req.user;

  try {
    const menu = await Menus.findOne({
      where: { id },
      include: [
        {
          model: Item,
          as: "items",
          attributes: ["id", "name", "price", "available"],
        },
      ],
    });

    if (!menu) {
      return res.status(404).json({ error: "Menu não encontrado." });
    }

    // Verificar se o menu pertence ao mesmo company_id do usuário autenticado
    if (menu.company_id !== company_id) {
      return res.status(403).json({ error: "Menu não encontrado." });
    }

    // Formatar a resposta
    const formattedMenus = {
      menu_id: menu.id,
      menu_name: menu.menu_name,
      items: menu.items.map((item) => ({
        item_id: item.id,
        name: item.name,
        price: item.price,
        available: item.available,
      })),
    };

    res.status(200).json(formattedMenus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o menu." });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  let { menu_name, image } = req.body;
  menu_name = menu_name.toLowerCase();

  try {
    if (!menu_name) {
      return res.status(400).json({ error: "O nome do menu é obrigatório." });
    }

    const { company_id } = req.user;
    if (!company_id) {
      return res
        .status(403)
        .json({ error: "Usuário não está associado a uma empresa." });
    }

    // Verifica se já existe um menu com o mesmo nome
    const existingMenu = await Menus.findOne({
      where: { menu_name, company_id },
    });

    if (existingMenu) {
      return res
        .status(400)
        .json({ error: "Já existe um menu com esse nome." });
    }

    // Faz o upload da imagem para o Imgur
    let imageUrl = "";
    if (image) {
      imageUrl = await uploadToImgur(image);
    }

    // Cria o menu
    const newMenu = await Menus.create({
      menu_name,
      company_id,
      image: imageUrl,
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
  let { menu_name, image } = req.body;
  const { company_id } = req.user;
  menu_name = menu_name.toLowerCase();

  try {
    if (!menu_name) {
      return res.status(400).json({ error: "O nome do menu é obrigatório." });
    }

    const menu = await Menus.findOne({ where: { id } });

    if (!menu) {
      return res.status(404).json({ error: "Menu não encontrado." });
    }

    // Verificar se o menu pertence ao mesmo company_id do usuário autenticado
    if (menu.company_id !== company_id) {
      return res.status(403).json({ error: "Menu não encontrado." });
    }

    await menu.update({
      menu_name,
      image,
    });

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
    const menu = await Menus.findOne({ where: { id } });

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
