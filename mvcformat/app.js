import express from "express";
const app = express();
const port = 3000;
import userRoutes from "./routes/userRoutes.js";
import ErrorMiddleware from "./middlewares/Error.js";
import { connectDb } from "./config/db.js";
connectDb(port);
app.use("/user", userRoutes);
app.use(ErrorMiddleware);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
