import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    limit: { type: Number, required: true },
    month: { type: String, required: true }
}, {
    timestamps: { createdAt: true, updatedAt: false }
})


export const budget = mongoose.model("budgetSchema", schema)