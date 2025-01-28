const express = require("express");
var cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const ordersRoutes = require("./routes/ordersRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", productRoutes);
app.use("/api", ordersRoutes);

module.exports = app;
