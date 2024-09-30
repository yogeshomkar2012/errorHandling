import express from "express";
const userRoutes = express.Router();
import { getNewUser } from "../controllers/userController.js";
userRoutes.get("/", getNewUser);
export default userRoutes;
