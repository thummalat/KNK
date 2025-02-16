const express = require("express");
const {
  fetchProducts,
  searchProducts,
  skusInfo,
  bestSellersInfo,
} = require("../controllers/productController");

const router = express.Router();

// Define API Endpoint to Fetch Data
router.get("/getproducts", fetchProducts);
router.get("/search", searchProducts); // Search products by name
router.get("/skusinfo", skusInfo);
router.get("/bestsellers", bestSellersInfo);

module.exports = router;
