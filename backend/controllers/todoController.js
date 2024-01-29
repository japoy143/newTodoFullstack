const mongoose = require("mongoose");

const todos = require("../models/todoModel");

const invalid = "Invalid Id format";

//creating TODO
const createTodo = async (req, res) => {
  const { title, category, day, content, color, done } = req.body;

  try {
    const todo = await todos.create({
      title: title,
      category: category,
      day: day,
      content: content,
      color: color,
      done: done,
    });
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(404).json({ mesagge: "Error Inserting Data" });
  }
};

//getALL TODO
const getTodos = async (req, res) => {
  try {
    const todo = await todos.find({}).sort({ createdAt: -1 });
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(404).json({ message: "Error fetching data" });
  }
};

//get specific todo
const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(invalid);
  }

  const todo = await todos.findById(id);

  if (!todo) {
    return res.status(404).json({ message: "No Specific Data" });
  }

  return res.status(200).json(todo);
};

//delete todo
const deleteData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(invalid);
  }

  const todo = await todos.findByIdAndDelete({ _id: id });

  if (!todo) {
    return res.status(404).json({ message: "Error Deleting Data" });
  }

  return res.status(200).json(todo);
};

//update Todo
const updateData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(invalid);
  }

  const todo = await todos.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!todo) {
    return res.status(404).json({ message: "Error Updating Data" });
  }

  return res.status(200).json(todo);
};

module.exports = {
  createTodo,
  getTodo,
  getTodos,
  deleteData,
  updateData,
};
