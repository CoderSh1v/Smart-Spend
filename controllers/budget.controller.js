import {budget} from "../models/budget.schema.js"
import mongoose from "mongoose";

export const addBudget = (req,res)=>{
    const date = new Date();

    budget.create({
        userId : new mongoose.Types.ObjectId(req.user.userId),
        limit : req.body.budget,
        month : date.toLocaleDateString("en-us",{month : "long"})
    })

    res.status(201).json({message: "success"})
} 
