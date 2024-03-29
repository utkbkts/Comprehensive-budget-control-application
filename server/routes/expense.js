const express = require("express");
const Expense = require("../models/expense.js");
const User = require("../models/auth.js");
const router = express.Router();

router.post("/add", async (req, res) => {
  const { creator, ...form } = req.body;
  try {
    const expenseData = await Expense.create({
      creator,
      ...form,
    });

    const data = await User.findByIdAndUpdate(
      creator,
      { $push: { expenseList: expenseData } },
      { new: true }
    );
    res.status(201).json({
      data: expenseData,
      success: true,
      message: "Ürün başarıyla oluşturuldu.",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message, success: false });
  }
});

//get

router.get("/get", async (req, res) => {
  try {
    const expense = await Expense.find().populate("creator");
    res.status(200).json(expense);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
