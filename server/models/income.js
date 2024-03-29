const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    income: {
      type: String,
    },
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;
