const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  id: Number,
  title: String,
  completed: Boolean,
});

model.exports = {
  todoSchema,
};
