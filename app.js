const express = require("express");
const productRoutes = require("./routes/productRoutes");
const { connectToDatabase } = require("./config/db");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", productRoutes);

console.log("here");

module.exports = app;
