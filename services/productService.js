const { getDb } = require("../config/db");

async function getProducts() {
  try {
    const db = getDb();
    const collection = db.collection("knk_collection"); // Specify the collection
    // const data = await collection.find({}).toArray(); // Fetch all documents
    // Use projection to exclude the 'price_USA' field
    const data = await collection
      .find({}, { projection: { price_USA: 0 } })
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

module.exports = { getProducts, searchProductsByName };
