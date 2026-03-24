import express from "express"
import { jwtAuth } from "../middleware/authMiddleware.js"
import { addexpense,getexpense,deleteexpense } from "../controllers/expenseController.js";
const expense = express.Router();

expense.use(jwtAuth);

expense.get("/",getexpense);

expense.post("/",addexpense);

expense.delete("/:id",deleteexpense);

export {expense}