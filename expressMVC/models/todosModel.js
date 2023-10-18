const { v4: uuidV4 } = require('uuid')

class TodoModel {
    constructor() {
        this.todos = [
            {
                titleL: 'model 裡的資料',
                uid: uuidV4()
            }
        ]
    }

    getAll() {
        return this.todos
    }

    create(todo) {
        const { title } = todo
        const newTodo = {
            title,
            uid: uuidV4()
        }

        this.todos.push(newTodo)

        return newTodo
    }
}

module.exports = new TodoModel()
