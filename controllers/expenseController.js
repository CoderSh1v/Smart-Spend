import { expense } from "../models/expense.js";

export const addexpense = (req, res) => {

    expense.create({
        userId: req.user.userId,
        amount: req.body.amount,
        category: req.body.category,
        note: req.body.note,
        date: new Date(req.body.date)
    })
    res.status(201).json({
        message: "Expense Added"
    })
}

export const getexpense = async (req, res) => {
    const expenses = await expense.find({ userId: req.user.userId });

    res.status(200).json({
        expenses
    })
}

export const deleteexpense = async (req, res) => {
    await expense.findByIdAndDelete({ _id: req.params.id })

    res.status(200).json({
        message: "done"
    })
}
