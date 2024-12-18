const express = require("express");
const {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  addItemsToMenu,
  deleteItemsFromMenu,
} = require("../controllers/menusController");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

router.get("/", authenticateToken, getMenus);
router.get("/:id", authenticateToken, getMenuById);
router.post("/", authenticateToken, createMenu);
router.put("/:id", authenticateToken, updateMenu);
router.delete("/:id", authenticateToken, deleteMenu);
router.put("/:menu_id/items", authenticateToken, addItemsToMenu);
router.delete("/:menu_id/items", authenticateToken, deleteItemsFromMenu);

module.exports = router;
