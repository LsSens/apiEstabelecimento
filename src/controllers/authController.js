const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Company, IntegrationIfood } = require("../models");
const transporter = require("../services/emailService");
const { Op } = require("sequelize");

const registerUser = async (req, res) => {
  const { email, password, name, phone, company } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "E-mail já está em uso." });
    }

    const existingCompany = await Company.findOne({
      where: { cnpj: company.cnpj },
    });
    if (existingCompany) {
      return res.status(400).json({ error: "CNPJ já está registrado." });
    }

    const newCompany = await Company.create({
      name: company.name,
      cnpj: company.cnpj,
      address: company.address,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      phone,
      company_id: newCompany.id,
    });

    const expiresIn = 60 * 60;

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
};

const loginUser = async (req, res) => {
  try {
    const { email, password: requestPassword } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Company,
          as: "company",
        }
      ]
    });
    if (!user) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." });
    }

    const isPasswordValid = await bcrypt.compare(requestPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." });
    }

    const ifoodIntegration = await IntegrationIfood.findOne({
      where: {
        company_id: user.company.id,
        token_expires_at: {
          [Op.gt]: new Date(),
        },
      },
    });

    const companyWithIntegrationStatus = {
      ...user.company.toJSON(),
      ifood_integration: !!ifoodIntegration,
    };

    const expiresIn = 60 * 60;

    const token = jwt.sign(
      {
        user_id: user.id,
        company_id: user.company_id,
        permissions: user.permissions,
      },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    const { password, company_id, ...userWithoutPassword } = user.toJSON();

    return res.status(200).json({
      data: {
        ...userWithoutPassword,
        company: companyWithIntegrationStatus,
      },
      token,
      expiresIn,
      permissions: user.permissions,
      message: "Login realizado com sucesso.",
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ error: "Erro ao fazer login." });
    }
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const resetTokenExpires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const resetTokenPayload = {
      email: user.email,
      expires: resetTokenExpires,
    };

    const resetToken = Buffer.from(JSON.stringify(resetTokenPayload)).toString(
      "base64"
    );

    user.reset_token = resetToken;
    user.reset_token_expires = resetTokenExpires;
    await user.save();

    const resetUrl = `https://nossaurl.com.br/forgot-password?token=${resetToken}&email=${encodeURIComponent(
      user.email
    )}`;

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
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decodedToken = JSON.parse(
      Buffer.from(token, "base64").toString("utf8")
    );

    if (!decodedToken.email || !decodedToken.expires) {
      return res.status(400).json({ error: "Token inválido." });
    }

    const tokenExpiration = new Date(decodedToken.expires);
    if (Date.now() > tokenExpiration) {
      return res.status(400).json({ error: "O token expirou." });
    }

    const email = decodedToken.email;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Senha redefinida com sucesso.",
    });
  } catch (error) {
    res.status(500).json({
      error: "Erro ao redefinir a senha.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
