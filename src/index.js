require("pg");

const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swaggerConfig");

const authRoutes = require("./routes/auth");
const menusRoutes = require("./routes/menus");
const itemRoutes = require("./routes/items");

const app = express();

// Permitindo origens
app.use(cors());
// Middleware básico
app.use(express.json());

// Configurar as rotas
app.use("/api/auth", authRoutes);
app.use("/api/menu", menusRoutes);
app.use("/api/menu", itemRoutes);

// Configuração do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Inicialização do servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
  console.log("Documentação disponível em http://localhost:3000/api-docs");
});
