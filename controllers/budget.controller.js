import { budget } from "../models/budget.schema.js"
import mongoose from "mongoose";
import { monthlySpend } from "../services/monthlySpend.js";


export const addBudget = (req, res) => {
    const date = new Date();

    budget.create({
        userId: new mongoose.Types.ObjectId(req.user.userId),
        limit: req.body.budget,
        month: date.toLocaleDateString("en-us", { month: "long" })
    })

    res.status(201).json({ message: "success" })
}

export const getBudget = async (req, res) => {
    if (!req.body.month) {
        return res.status(400).json({ message: "Month not found" })
    }
    const captitalMonth = req.body.month.charAt(0).toUpperCase() + req.body.month.slice(1);
    const monthlyData = await monthlySpend(req.user.userId)
    const monthlyTotal = monthlyData[0].total
    const budgetData = await budget.findOne({ userId: new mongoose.Types.ObjectId(req.user.userId), month: captitalMonth })
    if (!budgetData) {
        return res.status(200).json({
            status: "no budget",
            message: "No budget set for this month"
        })
    }
    if (monthlyTotal >= budgetData.limit) {
        return res.status(200).json({
            status: "exceeded",
            budgetData
        })
    }
    else {
        return res.status(200).json({
            status: "safe",
            budgetData
        })
    }

}