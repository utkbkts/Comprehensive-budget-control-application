const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productname: {
      type: String,
      required: true,
    },
    productprice: {
      type: String,
      required: true,
    },
    productdesc: {
      type: String,
      required: true,
    },
    productImage: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    paymentmethod: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
