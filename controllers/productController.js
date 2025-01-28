const {
  getProducts,
  searchProductsByName,
} = require("../services/productService");

async function fetchProducts(req, res) {
  try {
    const products = await getProducts();
    res.status(200).json(products); // Send data as JSON response
  } catch (error) {
    console.error("Error in fetchProducts:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
}

async function searchProducts(req, res) {
  try {
    const { title } = req.query; // Get the search query from the request
    if (!title) {
      return res.status(400).json({ error: "Title parameter is required" });
    }
    const products = await searchProductsByName(title);
    res.status(200).json(products); // Send matching products as JSON response
  } catch (error) {
    console.error("Error in searchProducts:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for products" });
  }
}

module.exports = { fetchProducts, searchProducts };
