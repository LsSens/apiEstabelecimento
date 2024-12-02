const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Delivery API",
      version: "1.0.0",
      description: "API de delivery no padrão Open Delivery.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local",
      },
    ],
  },
  apis: ["./src/swagger/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware básico
app.use(express.json());

// Inicialização do servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
  console.log("Documentação disponível em http://localhost:3000/api-docs");
});
