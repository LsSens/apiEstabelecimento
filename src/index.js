require("pg");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swaggerConfig");

const customersRoutes = require("./routes/customers");
const deliveriesRoutes = require("./routes/deliveries");
const ordersRoutes = require("./routes/orders");
const menusRoutes = require("./routes/menus");
const ifoodRoutes = require("./routes/ifood");
const itemRoutes = require("./routes/items");
const authRoutes = require("./routes/auth");

const app = express();

//Definir tamanho do payload
app.use(bodyParser.json({ limit: "8mb" }));
app.use(bodyParser.urlencoded({ limit: "8mb", extended: true }));

// Permitindo origens
app.use(cors());

// Middleware básico
app.use(express.json());

// Configurar as rotas
app.use("/api/deliveries", deliveriesRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/menus", menusRoutes);
app.use("/api/ifood", ifoodRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);

// Configuração do Swagger
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Inicialização do servidor
app.listen(3000, () => {
  console.log(
    "Servidor rodando em https://apiestabelecimento-production.up.railway.app"
  );
  console.log(
    "Documentação disponível em https://apiestabelecimento-production.up.railway.app/"
  );
});
