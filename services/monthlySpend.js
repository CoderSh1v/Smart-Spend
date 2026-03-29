import { expense } from "../models/expense.js";
import mongoose from "mongoose";

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