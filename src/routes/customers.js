const authenticateToken = require("../middlewares/authenticateToken");
const { Customer, CustomerCompany } = require("../models");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// Ver clientes relacionados a uma empresa
router.get("/", authenticateToken, async (req, res) => {
  const { company_id } = req.user;

  if (!company_id) {
    return res.status(401).json({ error: "Acesso negado. Token invalido." });
  }

  try {
    const customerCompanies = await CustomerCompany.findAll({
      where: { company_id },
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: [
            "id",
            "name",
            "email",
            "phone",
            "address",
            "createdAt",
            "updateAt",
          ],
        },
      ],
    });

    // Extrair os dados do cliente
    const customers = customerCompanies.map((relation) => relation.customer);

    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erro ao buscar clientes relacionados à empresa." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    let customer;

    // Verificar se o usuário existe - Email
    if (email) {
      customer = await Customer.findOne({ where: { email } });
      if (!customer) {
        return res.status(401).json({ error: "Usuario ou senha inválidos." });
      }
    }

    // Verificar se o usuário existe - Phone
    if (phone || !email) {
      customer = await Customer.findOne({ where: { phone } });
      if (!customer) {
        return res.status(401).json({ error: "Usuario ou senha inválidos." });
      }
    }

    // Comparar a senha
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." });
    }

    // Tempo de expiração do token
    const expiresIn = 60 * 60 * 1;

    // Gerar o token JWT
    const token = jwt.sign(
      {
        customer_id: customer.id,
      },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    res.status(200).json({
      token,
      expiresIn,
      message: "Login realizado com sucesso.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao fazer login." });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, cpf, address, phone } = req.body;

    // Validações básicas
    if (!name) {
      return res.status(400).json({ error: "Nome é obrigatório " });
    }

    // Verificar se o CPF já existe
    if (cpf) {
      const existingCustomer = await Customer.findOne({ where: { cpf } });
      if (existingCustomer) {
        return res.status(400).json({ error: "CPF Já registrado" });
      }
    }

    // Verificar se o EMAIL já existe
    if (email) {
      const existingCustomer = await Customer.findOne({ where: { email } });
      if (existingCustomer) {
        return res.status(400).json({ error: "Email Já registrado" });
      }
    }

    // Verificar se o Telefone já existe
    if (phone) {
      const existingCustomer = await Customer.findOne({ where: { phone } });
      if (existingCustomer) {
        return res
          .status(400)
          .json({ error: "Telefone já registrado Já registrado" });
      }
    }

    // Criar hash da senha (opcional)
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // Criar o novo usuário do Customer
    const customer = await Customer.create({
      name,
      email,
      password: hashedPassword,
      cpf,
      address,
      phone,
    });

    return res.status(201).json({
      data: customer,
      message: "Cliente criado com sucesso!",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the customer" });
  }
});

module.exports = router;
