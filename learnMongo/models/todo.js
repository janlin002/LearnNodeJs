const mongoose = require("mongoose");
const { todoSchema } = require("../schema/todo");

const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  Todo,
};
