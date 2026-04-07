import { budgetSchema } from "../models/budget.schema.js"
import mongoose from "mongoose";
import {latestBudget} from "../services/getBudgetAndStatus.js"
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
    if (!req.query.month || typeof(req.query.month) != "number" ) {
        return res.status(400).json({ message: "Month is required and in number format" })
    }
    const budgetData = await latestBudget(req.user.userId,req.query.month)
    
    res.status(200).json({
        success :"true",
        budget : budgetData.budget,
        month : budgetData.period.month,
        budget_Id : budgetData._id
    })
}

export const updateBudget = async(req,res)=>{
    if(!req.params.id){
        res.status(400).json({
            message : "budget Id is required to be updated"
        })
    }
    const updatedUser = await budgetSchema.findByIdAndUpdate(req.params.id,{budget : req.body.updatedBudget},{returnDocument : 'after'})

    res.status(200).json({
        message : "user updated",
        updatedUser
    })
}