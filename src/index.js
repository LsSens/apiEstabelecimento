require("module-alias/register");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swaggerConfig");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware básico
app.use(express.json());

// Configurar as rotas
app.use("/auth", authRoutes);

// Configuração do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Inicialização do servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
  console.log("Documentação disponível em http://localhost:3000/api-docs");
});
