const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRouters = require("./routes/auth.js");
const userRouters = require("./routes/user.js");
const productRouters = require("./routes/productadd.js");
const incomeRouters = require("./routes/incomeadd.js");
const expenseRouters = require("./routes/expense.js");
const todoRouters = require("./routes/todo.js");
const projectRouters = require("./routes/project.js");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

//routers
app.use("/auth", authRouters);
app.use("/user", userRouters);
app.use("/product", productRouters);
app.use("/income", incomeRouters);
app.use("/expense", expenseRouters);
app.use("/todo", todoRouters);
app.use("/project", projectRouters);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Failed to connect to MongoDB: ${err}`);
  });
