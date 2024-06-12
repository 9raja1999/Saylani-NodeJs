const { body, query } = require('express-validator')


const signupRouteValidator = [
    body('username')
        .isString().withMessage("username should not be an integer"),
    body('email')
        .trim()
        .isEmail().withMessage("invalid email"),
    body('password')
        .isString()
        .isLength({ min: 8, max: 15 }).withMessage('Password length should be 8 to 15 characters'),
]


const getTodoItemValidator = [
    query('')
]

module.exports = {
    signupRouteValidator
}

