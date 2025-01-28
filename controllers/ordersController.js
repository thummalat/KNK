const { getAllOrdersDetails } = require("../services/ordersService");

async function fetchAllOrders(req, res) {
  try {
    const products = await getAllOrdersDetails();
    res.status(200).json(products); // Send data as JSON response
  } catch (error) {
    console.error("Error in fetchingAllOrders:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching orders data" });
  }
}

module.exports = { fetchAllOrders };
