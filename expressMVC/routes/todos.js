const express = require('express');
const router = express.Router()
const todoControllers = require('../controllers/todoController')

// get all
router.get('/', todoControllers.getAllTodos);
// create 
router.post('/', todoControllers.createTodo)

 module.exports = router;