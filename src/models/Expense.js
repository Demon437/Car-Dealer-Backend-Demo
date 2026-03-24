const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
    {
        person: {
            type: String,
            enum: ["RAHUL MUKATI", "NILESH PRAJAPATI"],
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        category: {
            type: String,
            default: "General",
        },

        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
