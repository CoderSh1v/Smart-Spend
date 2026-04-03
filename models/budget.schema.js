import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    budget: { type: Number, required: true },
    period: {
        month: Number,
        year: Number
    }
}, { timestamps: true })

schema.index(
    { userId: 1, "period.month": 1, "period.year": 1 },
    { unique: true }
);

export const budgetSchema = mongoose.model("budgetSchema", schema)