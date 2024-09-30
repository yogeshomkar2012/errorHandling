import mongoose from "mongoose";
export const connectDb = async (port) => {
  try {
    const db = await mongoose.connect(
      "mongodb://localhost:27017/errorHandlingMvc"
    );

    console.log(`Connected with : http://${db.connection.host}:${port}`);
  } catch (error) {}
};
