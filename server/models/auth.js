const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImagePath: {
      type: String,
      default: "",
    },
    productList: {
      type: Array,
      default: [],
    },
    todoList: {
      type: Array,
      default: [],
    },
    incomeList: {
      type: Array,
      default: [],
    },
    expenseList: {
      type: Array,
      default: [],
    },
    projectList: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
