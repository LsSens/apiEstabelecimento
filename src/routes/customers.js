const express = require("express");
const {
  getCustomersByCompany,
  loginCustomer,
  registerCustomer,
} = require("../controllers/customersController");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

router.get("/", authenticateToken, getCustomersByCompany);
router.post("/login", loginCustomer);
router.post("/register", registerCustomer);

module.exports = router;
