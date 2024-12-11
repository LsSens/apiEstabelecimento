const express = require("express");
const router = express.Router();
const { getOrders, createOrder } = require("../controllers/orderController");
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", authenticateToken, getOrders);
router.post("/", authenticateToken, createOrder);

module.exports = router;
