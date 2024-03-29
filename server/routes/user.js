const express = require("express");
const User = require("../models/auth.js");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage,
  limits: {
    fieldSize: 1024 * 1024 * 10, // 10 MB (adjust the size as needed)
  },
});

router.put("/update/:id", upload.single("profileImage"), async (req, res) => {
  const { firstname, lastname, bio, profileImage } = req.body;
  const userId = req.params.id;
  if (!profileImage) {
    return res.status(400).json({ message: "No File Uploads", success: false });
  }
  const profileImagePath = profileImage;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstname,
        lastname,
        bio,
        profileImagePath,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      updatedUser,
      message: "Updated Profile Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Kullanıcı bulunamadı" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
