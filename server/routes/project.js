const express = require("express");
const Project = require("../models/project.js");
const User = require("../models/auth.js");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { creator, projectname, projectdesc, projectstart, projectend } =
      req.body;
    const project = await Project.create({
      creator,
      projectname,
      projectdesc,
      projectstart,
      projectend,
    });
    res.status(201).json({
      project,
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
    const project = await Project.find().populate("creator");

    res.status(200).json(project);
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
    const project = await Project.findByIdAndDelete(id);
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
