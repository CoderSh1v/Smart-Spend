import { budgetSchema } from "../models/budget.schema.js"
import mongoose from "mongoose";
import { monthlySpend } from "../services/monthlySpend.js";

const date = new Date();

export const addBudget = async (req, res) => {
    await budgetSchema.create({
        userId: new mongoose.Types.ObjectId(req.user.userId),
        budget: req.body.budget,
        period: {
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }
    })

    res.status(201).json({ message: "success" })
}

export const getBudget = async (req, res) => {
    if (!req.body.month || typeof(req.body.month) != "number" ) {
        return res.status(400).json({ message: "Month is required and in number format" })
    }
    const budgetData = await budgetSchema.findOne({ userId: new mongoose.Types.ObjectId(req.user.userId), period:{month: req.body.month,year : date.getFullYear()} })
    
    res.status(200).json({
        success :"true",
        budget : budgetData.budget,
        month : budgetData.period.month
    })
}

