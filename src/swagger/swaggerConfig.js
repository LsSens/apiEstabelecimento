const swaggerJsdoc = require("swagger-jsdoc");

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
        url: "https://apiestabelecimento-production.up.railway.app/api",
        description: "API Railway",
      },
      {
        url: "http://localhost:3000/api",
        description: "API Local",
      },
    ],
    components: {
      securitySchemes: {
        Authorization: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        Authorization: [],
      },
    ],
  },
  apis: ["./src/swagger/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
