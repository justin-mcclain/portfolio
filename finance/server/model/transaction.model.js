const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Transaction name required"],
        },
        category: {
            type: String,
            required: [true, "Category is required."],
            enum: [
                "Groceries",
                "Restaurants",
                "Rent/Mortgage",
                "Clothing",
                "Bills",
                "Travel",
                "Shopping",
            ],
        },
        price: {
            type: Number,
            required: [true, "Price is required."],
        },
        date: {
            type: Date,
            required: [true, "Date is required."],
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
