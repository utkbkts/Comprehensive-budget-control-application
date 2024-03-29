const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/auth.js");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//register

router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const profileImage = req.file;
    console.log(profileImage);
    if (!profileImage) {
      return res
        .status(400)
        .json({ message: "No File Uploads", success: false });
    }
    const profileImagePath = profileImage.path;
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "user already exists", success: false });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      profileImagePath,
    });
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "registered Successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(409)
        .json({ success: false, message: "user is not found" });
    }
    const passwordCompare = bcryptjs.compare(password, user.password);

    if (!passwordCompare) {
      return res
        .status(409)
        .json({ success: false, message: "password wrong !!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    return res.status(200).json({
      success: true,
      message: "Login Successfuly",
      token: token,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
