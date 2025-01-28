const express = require("express");
const { fetchAllOrders } = require("../controllers/ordersController");

const router = express.Router();

// Define API Endpoint to Fetch Data
router.get("/getallorders", fetchAllOrders);

module.exports = router;
