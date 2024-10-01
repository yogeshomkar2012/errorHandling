import mongoose from "mongoose";
const connectionString = process.env.DBCONNECTIONsTRING;
export const connectDb = async (port) => {
  try {
    const db = await mongoose.connect(connectionString);

    console.log(`Connected with : http://${db.connection.host}:${port}`);
  } catch (error) {
    console.error("DB connection error:", error);
  }
};
