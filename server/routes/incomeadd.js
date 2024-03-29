const express = require("express");
const Income = require("../models/income.js");
const User = require("../models/auth.js");
const router = express.Router();

router.post("/add", async (req, res) => {
  const { income, creator } = req.body;

  try {
    const incomeData = await Income.create({ creator, income });

    const data = await User.findByIdAndUpdate(
      creator,
      { $push: { incomeList: incomeData } },
      { new: true }
    );
    res.status(201).json({
      data: incomeData,
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
    const income = await Income.find().populate("creator");
    res.status(200).json(income);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
