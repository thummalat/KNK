const express = require("express");
const productRoutes = require("./routes/productRoutes");
const { connectToDatabase } = require("./config/db");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", productRoutes);

console.log("here");

// // Connect to MongoDB
// connectToDatabase()
//   .then(() => console.log("Database connection established"))
//   .catch((err) => console.error("Database connection failed:", err));

module.exports = app;
