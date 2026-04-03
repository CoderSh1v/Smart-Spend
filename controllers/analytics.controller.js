import { monthlySpend } from "../services/monthlySpend.js";
import { categoryTotal } from "../services/categorySpend.js";

const predict = async (data) => {
    const month1 = data[0].total || 0;
    const month2 = data[1].total || 0;
    const month3 = data[2].total || 0;
    const total = Math.round((month1 + month2 + month3) / 3);
    return total;
}

export const getall = async (req, res) => {
    const monthWiseData = await monthlySpend(req.user.userId);
    const categoryWiseData = await categoryTotal(req.user.userId);
    const prediction = await predict(monthWiseData)
    res.status(200).json({
        monthWiseData,
        categoryWiseData,
        prediction
    })
} 