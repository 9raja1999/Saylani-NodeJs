const express = require('express')

const route = express.Router()


route.post('/create-todo', (req, res) => {
    res.send('Hi from todo')
})

module.exports = {route}