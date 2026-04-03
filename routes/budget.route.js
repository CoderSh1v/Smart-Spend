import express from "express"
import { jwtAuth } from "../middleware/authMiddleware.js";
import { addBudget, getBudget, updateBudget} from "../controllers/budget.controller.js";
const budget = express.Router();

budget.use(jwtAuth);

budget.post("/",addBudget);

budget.get("/",getBudget);

budget.patch("/:id",updateBudget)

export {budget}