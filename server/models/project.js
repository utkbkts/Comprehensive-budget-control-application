const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    projectname: {
      type: String,
      required: true,
    },
    projectstart: {
      type: Date,
      required: true,
    },
    projectdesc: {
      type: String,
      required: true,
    },
    projectend: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
