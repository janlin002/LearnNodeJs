const request = require('supertest')
const app = require('../app')
const TodoModel = require('../models/todosModel')

// init
beforeEach(()=>{
    TodoModel.todos = [
        {
            id: '1', title: '123', completed: false
        }
    ]
})


// ('名稱', callback())
test('get all todo data ', async () => {
    const res = await request(app).get('/todos')
    // console.log(res, 'res')

    expect(res.body).toEqual(TodoModel.todos)
    expect(res.statusCode).toBe(200)
})
