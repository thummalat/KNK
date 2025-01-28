const express = require("express");
const productRoutes = require("./routes/productRoutes");
const ordersRoutes = require("./routes/ordersRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", productRoutes);
app.use("/api", ordersRoutes);

module.exports = app;
