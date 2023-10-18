const todoModel = require('../models/todosModel')

exports.getAllTodos = (req, res, next) => {
    const todos = todoModel.getAll()
    res.send({
       status: 'Success',
       todos
    });
}

exports.createTodo = (req, res) => {
    const { title } = req.body
    const newTodo = todoModel.create({
       title,
    })
 
    res.send({
       status: 'Success',
       todo: newTodo
    })
 
 }