const app = require("./app");
const { connectToDatabase } = require("./config/db");

const port = process.env.PORT || 3001;

// Connect to MongoDB before starting the server
const startServer = async () => {
  try {
    await connectToDatabase();
    console.log("Database connection established");

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the process if the database connection fails
  }
};

startServer();
