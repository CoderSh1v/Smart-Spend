import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    note: String,
    date: { type: Date, required: true }
}, {
    timestamps: { createdAt: true, updatedAt: false }
})


export const expense = mongoose.model("expenseSchema", schema)