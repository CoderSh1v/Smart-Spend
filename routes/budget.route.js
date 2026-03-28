import express from "express"
import { jwtAuth } from "../middleware/authMiddleware.js";

const budget = express.Router();

budget.use(jwtAuth);

// budget.get("/",);

// budget.post("/",);

export {budget}