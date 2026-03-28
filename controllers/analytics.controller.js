import { expense } from "../models/expense.js";
import mongoose from "mongoose";
export const categoryTotal = async (userId) => {

    const data = await expense.aggregate([{
        $match: { "userId": new mongoose.Types.ObjectId(userId) }
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

    return data;
}

export const monthlySpend = async (userId) => {

    const data = await expense.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
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
            $sort: {
                "_id": -1
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

    return data;
}

export const predict = async (data) => {
    const month1 = data[0].total || 0;
    const month2 = data[1].total || 0;
    const month3 = data[2].total || 0;
    const total =  Math.round((month1+ month2 + month3 )/3);
    return total;
}

export const getall = async (req, res) => {
    const monthWiseData= await monthlySpend(req.user.userId);
    const categoryWiseData = await categoryTotal(req.user.userId);
    const prediction = await predict(monthWiseData)
    res.status(200).json({
        monthWiseData,
        categoryWiseData,
        prediction
    })
} 