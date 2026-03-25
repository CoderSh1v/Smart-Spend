import { expense } from "../models/expense.js";
import mongoose from "mongoose";
export const categoryTotal = async (req, res) => {

    const data = await expense.aggregate([{
        $match: { "userId": new mongoose.Types.ObjectId(req.user.userId) }
    },
    {
        $group: {
            _id: "$category",
            total: { $sum: "$amount" },
        }
    },
    {
        $project: {
            category: "$_id",
            total: 1,
            _id: 0
        }
    }

    ])

    res.status(200).json({
        data
    })
}

export const monthlySpend = async (req, res) => {

    const data = await expense.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: {
                    $dateTrunc: {
                        date: "$date",
                        unit: "month"
                    }
                },
                total: { $sum: "$amount" }
            }
        },
        {
            $project: {
                month: { $dateToString: { format: "%Y-%m", date: "$_id" } },
                total: 1,
                _id: 0
            }
        }
    ])

    res.status(200).json({
        data
    })
}