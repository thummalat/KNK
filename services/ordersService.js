const { getDb } = require("../config/db");

async function getAllOrdersDetails() {
  try {
    const db = getDb();
    const collection = db.collection("knk_orders"); // Specify the collection
    const data = await collection.find({}).toArray(); // Fetch all documents
    return data;
  } catch (error) {
    console.error("Error fetching orders details:", error);
    throw error;
  }
}

module.exports = { getAllOrdersDetails };
