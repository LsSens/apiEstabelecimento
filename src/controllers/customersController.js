const { Customer, CustomerCompany } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const paginationService = require("../services/paginationService");

const getCustomersByCompany = async (req, res) => {
  const { company_id } = req.user;

  if (!company_id) {
    return res.status(401).json({ error: "Acesso negado. Token inválido." });
  }

  try {
    await paginationService(CustomerCompany, {
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
            "updatedAt",
          ],
        },
      ],
    })(req, res, () => {
      const customers = res.pagination.data.map((relation) => relation.customer);

      res.status(200).json({
        currentPage: res.pagination.currentPage,
        totalPages: res.pagination.totalPages,
        totalItems: res.pagination.totalItems,
        itemsPerPage: res.pagination.itemsPerPage,
        data: customers,
      });
    });
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    res.status(500).json({
      error: "Erro ao buscar clientes relacionados à empresa.",
    });
  }
};

const loginCustomer = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    let customer;

    if (email) {
      customer = await Customer.findOne({ where: { email } });
      if (!customer) {
        return res.status(401).json({ error: "Usuário ou senha inválidos." });
      }
    }

    if (phone || !email) {
      customer = await Customer.findOne({ where: { phone } });
      if (!customer) {
        return res.status(401).json({ error: "Usuário ou senha inválidos." });
      }
    }

    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." });
    }

    const expiresIn = 60 * 60 * 1;

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
};

const registerCustomer = async (req, res) => {
  try {
    const { name, email, password, cpf, address, phone } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Nome é obrigatório." });
    }

    if (cpf) {
      const existingCustomer = await Customer.findOne({ where: { cpf } });
      if (existingCustomer) {
        return res.status(400).json({ error: "CPF já registrado." });
      }
    }

    if (email) {
      const existingCustomer = await Customer.findOne({ where: { email } });
      if (existingCustomer) {
        return res.status(400).json({ error: "Email já registrado." });
      }
    }

    if (phone) {
      const existingCustomer = await Customer.findOne({ where: { phone } });
      if (existingCustomer) {
        return res.status(400).json({ error: "Telefone já registrado." });
      }
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const customer = await Customer.create({
      name,
      email,
      password: hashedPassword,
      cpf,
      address,
      phone,
    });

    res.status(201).json({
      data: customer,
      message: "Cliente criado com sucesso!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro ao criar cliente.",
    });
  }
};

module.exports = {
  getCustomersByCompany,
  loginCustomer,
  registerCustomer,
};
