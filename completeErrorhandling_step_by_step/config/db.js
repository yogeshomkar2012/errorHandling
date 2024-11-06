const mongoose = require("mongoose");
const connectionString = process.env.CONN_STRING;
const { DatabaseConntionError } = require("../utils/customErrors");
const dbConnection = async (port) => {
  try {
    const db = await mongoose.connect(connectionString);
    console.log(`connected with : http://${db.connection.host}:${port}`);
  } catch (error) {
    throw new DatabaseConntionError("Initial database connection failed");
    process.exit(1);
  }
  mongoose.connection.on("error", (error) => {
    throw new DatabaseConntionError("Ongoing database connection error", 500);
  });
  mongoose.connection.on("disconnected", () => {
    console.warn("Database connection lost. Attempting to reconnect...");
    setTimeout(connectDB, 5000); // Attempt to reconnect after a delay
  });
};
module.exports = dbConnection;
