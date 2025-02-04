const { getAllOrdersDetails } = require("../services/ordersService");

async function fetchAllOrders(req, res) {
  try {
    const products = await getAllOrdersDetails();
    let totalSoldCost = 0;
    if (products.length > 0) {
      totalSoldCost = products.reduce((acc, cur) => {
        const { sold_price, quantities_sold } = cur;
        acc += parseFloat(sold_price) * quantities_sold;
        return acc;
      }, 0);
    }

    console.log(totalSoldCost);
    const result = { totalSoldCost, soldProductDetails: products };
    res.status(200).json(result); // Send data as JSON response
  } catch (error) {
    console.error("Error in fetchingAllOrders:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching orders data" });
  }
}

module.exports = { fetchAllOrders };
