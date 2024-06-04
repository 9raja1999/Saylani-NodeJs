const express = require('express')
const { createTodo } = require('../controllers/todo.controller')
const { checkAuth } = require('../middlewares/check-auth.middleware')

const route = express.Router()


route.post('/create-todo', checkAuth ,createTodo)

module.exports = { route }