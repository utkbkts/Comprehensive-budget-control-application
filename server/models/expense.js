const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    invoice: {
      type: String,
      required: true,
    },
    rent: {
      type: String,
      required: true,
    },
    transport: {
      type: String,
      required: true,
    },
    entertainment: {
      type: String,
    },
    shopping: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    health: {
      type: String,
      required: true,
    },
    travel: {
      type: String,
      required: true,
    },
    alcohol: {
      type: String,
      required: true,
    },
    homecare: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", ExpenseSchema);
module.exports = Expense;
