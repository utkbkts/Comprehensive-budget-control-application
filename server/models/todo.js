const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
