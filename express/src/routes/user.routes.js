const express = require('express')
const { login, signup, logout } = require('../controllers/user.controller')

const route = express.Router()


route.post('/login', login)
route.post('/signup', signup)
route.post('/logout', logout)



module.exports = { route }