const express = require('express');
const router = express.Router()
const todoControllers = require('../controllers/todoController')

// get all
router.get('/', 
    /* 	#swagger.tags = ['User']
    #swagger.description = 'Endpoint to sign in a specific user' */
todoControllers.getAllTodos);
// create 
router.post('/', 

       /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'User information.',
            required: true,
            schema: { 
                "title": "string",
            "uid": "string"
             }
    } */
todoControllers.createTodo)

 module.exports = router;