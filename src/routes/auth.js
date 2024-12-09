const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Company } = require("../../models");
const transporter = require("../services/emailService");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, name, phone, company } = req.body;

  try {
    // Verificar se o e-mail já está em uso
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "E-mail já está em uso." });
    }

    // Verificar se o CNPJ já está em uso
    const existingCompany = await Company.findOne({
      where: { cnpj: company.cnpj },
    });
    if (existingCompany) {
      return res.status(400).json({ error: "CNPJ já está registrado." });
    }

    // Criar a empresa
    const newCompany = await Company.create({
      name: company.name,
      cnpj: company.cnpj,
      address: company.address,
    });

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o usuário associado à empresa
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      phone,
      company_id: newCompany.id,
    });

    // Tempo de expiração do token
    const expiresIn = 60 * 60 * 1;

    // Gerar o token JWT
    const token = jwt.sign(
      {
        user_id: newUser.id,
        company_id: newUser.company_id,
        permissions: newUser.permissions,
      },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    res.status(201).json({
      message: "Usuário e empresa criados com sucesso.",
      token,
      expiresIn,
      permissions: newUser.permissions,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        company_id: newUser.company_id,
      },
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

    // Tempo de expiração do token
    const expiresIn = 60 * 60 * 1;

    // Gerar o token JWT
    const token = jwt.sign(
      {
        user_id: user.id,
        company_id: user.company_id,
        permissions: user.permissions,
      },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    res.status(200).json({
      token,
      expiresIn,
      permissions: user.permissions,
      message: "Login realizado com sucesso.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao fazer login." });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar se o e-mail existe no banco de dados
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Gerar o token de redefinição de senha com e-mail e expiração
    const resetTokenExpires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const resetTokenPayload = {
      email: user.email,
      expires: resetTokenExpires,
    };

    // Converte o payload em base64 para criar o token
    const resetToken = Buffer.from(JSON.stringify(resetTokenPayload)).toString(
      "base64"
    );

    // Salvar o token e a expiração no banco de dados
    user.reset_token = resetToken;
    user.reset_token_expires = resetTokenExpires;
    await user.save();

    // Gerar a URL para redefinição
    const resetUrl = `https://nossaurl.com.br/forgot-password?token=${resetToken}&email=${encodeURIComponent(
      user.email
    )}`;

    // Enviar o e-mail com o link de redefinição
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Redefinição de senha",
      text: `Você solicitou a redefinição de sua senha. Clique no link abaixo para redefinir sua senha:\n\n${resetUrl}\n\nEste link expira em 2 horas.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "E-mail de redefinição enviado com sucesso.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro ao enviar e-mail de redefinição de senha.",
    });
  }
});

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Decodificar o token
    const decodedToken = JSON.parse(
      Buffer.from(token, "base64").toString("utf8")
    );

    // Verificar se o token contém o e-mail e a expiração
    if (!decodedToken.email || !decodedToken.expires) {
      return res.status(400).json({ error: "Token inválido." });
    }

    const tokenExpiration = new Date(decodedToken.expires);
    if (Date.now() > tokenExpiration) {
      return res.status(400).json({ error: "O token expirou." });
    }

    const email = decodedToken.email;

    // Verificar se o e-mail existe no banco de dados
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Redefinir a senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Salvar as alterações no banco de dados
    await user.save();

    res.status(200).json({
      message: "Senha redefinida com sucesso.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro ao redefinir a senha.",
    });
  }
});

module.exports = router;
