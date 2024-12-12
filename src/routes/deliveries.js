const express = require("express");
const {
  createDelivery,
  getDeliveryById,
  getDeliveriesByCompany,
  cancelDelivery,
} = require("../controllers/deliveryController");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

router.get("/", authenticateToken, getDeliveriesByCompany);
router.post("/", authenticateToken, createDelivery);
router.get("/:id", authenticateToken, getDeliveryById);
router.delete("/:deliveryId", authenticateToken, cancelDelivery);

module.exports = router;
