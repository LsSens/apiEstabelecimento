require("module-alias/register");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swaggerConfig");

const authRoutes = require("./routes/auth");
const menusRoutes = require("./routes/menus");
const itemRoutes = require("./routes/items");

const app = express();

// Middleware básico
app.use(express.json());

// Configurar as rotas
app.use("/auth", authRoutes);
app.use("/menu", menusRoutes);
app.use("/menu", itemRoutes);

// Configuração do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Inicialização do servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
  console.log("Documentação disponível em http://localhost:3000/api-docs");
});
