const express = require("express");
const {
  fetchProducts,
  searchProducts,
} = require("../controllers/productController");

const router = express.Router();

// Define API Endpoint to Fetch Data
router.get("/getproducts", fetchProducts);
router.get("/search", searchProducts); // Search products by name

module.exports = router;
