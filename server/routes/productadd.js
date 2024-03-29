const cloudinary = require("../utils/cloudinary.js");
const express = require("express");
const Product = require("../models/productPost.js");
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
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.post("/add", upload.single("productImage"), async (req, res) => {
  try {
    const { creator, productname, productdesc, paymentmethod, productprice } =
      req.body;
    const listingPhotos = req.file;

    if (!listingPhotos) {
      return res
        .status(500)
        .json({ success: false, message: "No File Uploaded" });
    }
    const productImage = listingPhotos.path;
    const results = await cloudinary.uploader.upload(productImage, {
      folder: "food-ordering",
    });
    const product = await Product.create({
      creator,
      productname,
      productdesc,
      productprice,
      paymentmethod,
      productImage: {
        public_id: results.public_id,
        url: results.secure_url,
      },
    });
    await User.findByIdAndUpdate(
      creator,
      { $push: { productList: product } },
      { new: true }
    );
    res.status(201).json({
      data: product,
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
    const product = await Product.find().populate("creator");
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
