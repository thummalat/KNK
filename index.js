const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 3000;

// MongoDB Connection Configuration
const uri =
  "mongodb+srv://<dbUsername>:<dbPassword>@cluster0-knk.r1le5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-KNK";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB
async function connectToDatabase() {
  try {
    if (!client.isConnected) {
      await client.connect();
      console.log("Connected to MongoDB");
    }
    return client.db("knk_db"); // Database name
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// Define API Endpoint to Fetch Data
app.get("/api/data", async (req, res) => {
  try {
    const db = await connectToDatabase(); // Get the database
    const collection = db.collection("knk_collection"); // Specify the collection

    const data = await collection.find({}).toArray(); // Fetch all documents
    res.status(200).json(data); // Send data as JSON response
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

// Start the Express Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
