const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, name, phone, company } = req.body;

  try {
    // Verificar se o e-mail já está em uso
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "E-mail já está em uso." });
    }

    // Criar a empresa
    const newCompany = await Company.create({
      name: company.name,
      cnpj: company.cnpj,
      address: company.address,
    });

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o usuário vinculado à empresa
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      phone,
      company_id: newCompany.id,
      permission: "admin", // Define a permissão como 'admin'
    });

    res.status(201).json({
      message: "Usuário e empresa registrados com sucesso.",
      user,
      company: newCompany,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar usuário e empresa." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." });
    }

    // Comparar a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." });
    }

    // Gerar o token JWT
    const token = jwt.sign(
      {
        user_id: user.id,
        company_id: user.company_id,
      },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao fazer login." });
  }
});

module.exports = router;
