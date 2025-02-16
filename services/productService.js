const { getDb } = require("../config/db");

async function getSkusInfo() {
  try {
    const db = getDb();
    const collection = db.collection("knk_collection");
    const projection = { sku: 1, title: 1, _id: 0 };
    const data = await collection.find({}).project(projection).toArray();
    return data;
  } catch (error) {
    console.error("Error fetching skusInformation:", error);
    throw error;
  }
}

async function getBestSellersInfo() {
  try {
    const db = getDb();
    const ordersCollection = db.collection("knk_orders");
    const productsCollection = db.collection("knk_collection");

    const pipeline = [
      {
        $group: {
          _id: "$sku", // Group by SKU
          totalQuantitiesSold: { $sum: "$quantities_sold" }, // Sum quantities_sold for each SKU
          docIds: { $push: "$_id" }, // Collect all _id values into an array
          customerNames: { $push: "$customer_name" }, // Collect all customer names into an array
        },
      },
      {
        $sort: { totalQuantitiesSold: -1 }, // Sort by totalQuantitiesSold in descending order
      },
      {
        $lookup: {
          from: "knk_collection", // The collection to join with
          localField: "_id", // Field from the knk_orders collection (sku)
          foreignField: "sku", // Field from the knk_collection collection (sku)
          as: "productDetails", // Array containing matched documents
        },
      },
      {
        $unwind: "$productDetails", // Unwind the productDetails array (since $lookup returns an array)
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          sku: "$_id", // Rename _id to sku
          totalQuantitiesSold: 1, // Include the totalQuantitiesSold
          docIds: 1, // Include the array of _id values
          customerNames: 1, // Include the array of customer names
          title: "$productDetails.title", // Include the title from the joined collection
        },
      },
    ];

    // Execute the aggregation query
    const result = await ordersCollection.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error("Error fetching top-selling SKUs:", error);
    throw error;
  }
}

async function getProducts() {
  try {
    const db = getDb();
    const collection = db.collection("knk_collection"); // Specify the collection
    // const data = await collection.find({}).toArray(); // Fetch all documents
    // Use projection to exclude the 'price_USA' field
    const data = await collection
      .find({}, { projection: { price_IND: 0 } })
      .toArray();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

async function searchProductsByName(title) {
  try {
    const db = getDb();
    const collection = db.collection("knk_collection"); // Specify the collection
    const query = { title: { $regex: title, $options: "i" } }; // Case-insensitive search
    const data = await collection.find(query).toArray(); // Fetch matching documents
    return data;
  } catch (error) {
    console.error("Error searching products by name:", error);
    throw error;
  }
}

module.exports = {
  getProducts,
  searchProductsByName,
  getSkusInfo,
  getBestSellersInfo,
};
