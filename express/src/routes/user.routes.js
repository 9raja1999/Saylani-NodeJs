const express = require('express')
const { login, signup } = require('../controllers/user.controller')

const route = express.Router()


route.post('/login', login)
route.post('/signup', signup)



module.exports = { route }