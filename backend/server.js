const express = require("express");
require("dotenv").config();
require("colors");
const mongoose = require("mongoose");
const app = express();

const route = require("./routes/todoRoutes");
//body
app.use(express.json());

//middleware
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Listening on Port ${PORT}`.blue));
    console.log("DB connect successfully".blue);
  })
  .catch(() => console.log("DB connection error".red));

app.use("/data/todos", route);
