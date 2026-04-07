import { monthlySpend } from "../services/monthlySpend.js";
import { categoryTotal } from "../services/categorySpend.js";
import { budgetStatus } from "../services/getBudgetAndStatus.js";

const predict = async (data) => {
    const month1 = data[0].total || 0;
    const month2 = data[1].total || 0;
    const month3 = data[2].total || 0;
    const total = Math.round((month1 + month2 + month3) / 3);
    return total;
}

export const getall = async (req, res) => {
    if(typeof(req.query.month)!="number"){
        return res.status(400).json({
            message: "month is required in number"
        })
    }

    const monthWiseData = await monthlySpend(req.user.userId);
    const categoryWiseData = await categoryTotal(req.user.userId);
    const prediction = await predict(monthWiseData)
    const budgetData = await  budgetStatus(req.user.userId,req.query.month)
    res.status(200).json({
        prediction,
        budgetData,
        monthWiseData,
        categoryWiseData
    })
} 