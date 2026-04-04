import { budgetSchema } from "../models/budget.schema.js";
import { monthlySpend } from "./monthlySpend.js";
const date = new Date()

export const latestBudget = async (userId, month) => {
    const latestBudgetData = await budgetSchema.findOne({
        userId: userId,
        period: { month: month, year: date.getFullYear() }
    })

    return latestBudgetData;
}

export const budgetStatus = async (userId, month) => {
    const budgetData = await latestBudget(userId, month);
    const monthlySpendingData = await monthlySpend(userId)
    const latestMonthUsage = monthlySpendingData[0].total
    console.log(budgetData)
    let data = {}
    if (latestMonthUsage >= budgetData.budget) {
        data = {
        budgetStatus : "exceeded",
        budget : budgetData.budget
        }
    }
    else{
        data = {
        budgetStatus : "safe",
        budget : budgetData.budget
        }
    }
    return data
} 