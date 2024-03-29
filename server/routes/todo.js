const express = require("express");
const Todo = require("../models/todo.js");
const User = require("../models/auth.js");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, creator } = req.body;
    const todo = await Todo.create({
      title,
      creator,
    });

    res.status(201).json({
      todo,
      success: true,
      message: "Ürün başarıyla oluşturuldu.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const todo = await Todo.find().populate("creator");

    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
