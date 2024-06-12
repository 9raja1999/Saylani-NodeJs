const express = require('express')
const { createTodo, getTodoItem , createTodoListItem} = require('../controllers/todo.controller')
const { checkAuth } = require('../middlewares/check-auth.middleware')

const route = express.Router()


route.post('/create-todo', createTodo)
route.get('/get-todo-item/:todoId', getTodoItem)
route.post('/list-item/:todoId/create', createTodoListItem)

module.exports = { route }