const { Menus, Item, MenuItems } = require("../models");
const uploadToImgur = require("../images/imgur");

const getMenus = async (req, res) => {
  const { company_id } = req.user;

  try {
    const menus = await Menus.findAll({
      where: { company_id },
      include: [
        {
          model: Item,
          as: "items",
          attributes: ["id", "name", "price", "available"],
          through: { attributes: [] },
        },
      ],
    });

    const formattedMenus = menus.map((menu) => ({
      menu_id: menu.id,
      menu_name: menu.menu_name,
      menu_image: menu.image,
      items: menu.items.slice(0, 3).map((item) => ({
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
};

const getMenuById = async (req, res) => {
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

    if (!menu || menu.company_id !== company_id) {
      return res.status(404).json({ error: "Menu não encontrado." });
    }

    const formattedMenu = {
      menu_id: menu.id,
      menu_name: menu.menu_name,
      items: menu.items.map((item) => ({
        item_id: item.id,
        name: item.name,
        price: item.price,
        available: item.available,
      })),
    };

    res.status(200).json(formattedMenu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar o menu." });
  }
};

const createMenu = async (req, res) => {
  let { menu_name, image } = req.body;
  menu_name = menu_name.toLowerCase();

  try {
    if (!menu_name) {
      return res.status(400).json({ error: "O nome do menu é obrigatório." });
    }

    const { company_id } = req.user;

    const existingMenu = await Menus.findOne({
      where: { menu_name, company_id },
    });

    if (existingMenu) {
      return res
        .status(400)
        .json({ error: "Já existe um menu com esse nome." });
    }

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadToImgur(image);
    }

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
};

const updateMenu = async (req, res) => {
  const { id } = req.params;
  let { menu_name, image } = req.body;
  const { company_id } = req.user;
  menu_name = menu_name.toLowerCase();

  try {
    const menu = await Menus.findOne({ where: { id, company_id } });

    if (!menu) {
      return res.status(404).json({ error: "Menu não encontrado." });
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
};

const deleteMenu = async (req, res) => {
  const { id } = req.params;
  const { company_id } = req.user;

  try {
    const menu = await Menus.findOne({ where: { id, company_id } });

    if (!menu) {
      return res.status(404).json({ error: "Menu não encontrado." });
    }

    await menu.destroy();

    res.status(200).json({
      message: "Menu excluído com sucesso.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir o menu." });
  }
};

const addItemsToMenu = async (req, res) => {
  const { menu_id } = req.params;
  const { items } = req.body;
  const { company_id } = req.user;

  try {
    const menu = await Menus.findOne({ where: { id: menu_id, company_id } });

    if (!menu) {
      return res.status(404).json({ error: "Menu não encontrado." });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Os itens devem ser válidos." });
    }

    const associatedItems = [];

    for (const item of items) {
      const { name, price, available, image } = item;

      if (
        !name ||
        typeof price !== "number" ||
        typeof available !== "boolean"
      ) {
        return res.status(400).json({
          error: "Item inválido. Campos obrigatórios: name, price, available.",
        });
      }

      let existingItem = await Item.findOne({
        where: { name, company_id },
      });

      if (!existingItem) {
        existingItem = await Item.create({
          name,
          price,
          available,
          image: image || null,
          company_id,
        });
      }

      await MenuItems.findOrCreate({
        where: { menu_id, item_id: existingItem.id },
      });

      const itemToReturn = existingItem.toJSON();
      delete itemToReturn.company_id;

      associatedItems.push(itemToReturn);
    }

    res.status(201).json({
      message: "Itens adicionados ao menu com sucesso.",
      items: associatedItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao adicionar itens ao menu." });
  }
};

module.exports = {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  addItemsToMenu,
};
