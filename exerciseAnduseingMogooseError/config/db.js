const mongoose = require("mongoose");
const connectionString = process.env.DBCONNECTIONSTRING;
const dbConnection = async (port) => {
  try {
      const db = await mongoose.connect(connectionString);
      console.log(`connected with : http://${db.connection.host}:${port}`)
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = dbConnection;
