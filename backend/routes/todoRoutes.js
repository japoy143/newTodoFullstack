const express = require("express");
const {
  createTodo,
  getTodo,
  getTodos,
  deleteData,
  updateData,
} = require("../controllers/todoController");
const route = express.Router();

//create document
route.post("/", createTodo);

//getAll
route.get("/", getTodos);

//getSpecific
route.get("/:id", getTodo);

//delete document
route.delete("/:id", deleteData);

//update document
route.patch("/:id", updateData);

module.exports = route;
