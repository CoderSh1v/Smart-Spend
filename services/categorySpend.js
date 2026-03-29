import { expense } from "../models/expense.js";
import mongoose from "mongoose";

export const categoryTotal = async (userId) => {
    const data = await expense.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $group: {
                _id: {
                    month: {
                        $dateTrunc: {
                            date: "$date",
                            unit: "month"
                        }
                    },
                    category: "$category"
                },
                total: { $sum: "$amount" }
            }
        },
        {
            $sort: {
                "_id.month": -1
            }
        },
        {
            $project: {
                month: { $dateToString: { format: "%Y-%m", date: "$_id.month" } },
                category: "$_id.category",
                _id: 0,
                total: 1
            }
        }
    ])
    return data;
}