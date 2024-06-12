const express = require('express')
const { login, signup, logout, verifyOtp } = require('../controllers/user.controller')
const { signupRouteValidator } = require('../validators/request.validator')

const route = express.Router()


route.post('/login', login)
route.post('/signup', signupRouteValidator, signup)
route.post('/verify-otp', verifyOtp)
route.post('/logout', logout)



module.exports = { route }