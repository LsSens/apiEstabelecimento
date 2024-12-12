const express = require("express");
const router = express.Router();
const { getOrders, createOrder, deleteOrder } = require("../controllers/orderController");
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", authenticateToken, getOrders);
router.post("/", authenticateToken, createOrder);
router.delete("/:orderId", authenticateToken, deleteOrder);

module.exports = router;
