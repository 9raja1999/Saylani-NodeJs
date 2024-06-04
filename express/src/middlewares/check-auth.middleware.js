const jwt = require('jsonwebtoken')
const { config } = require('../configs/server.config.js')

const checkAuth = (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if (!token) {
            return res.status(401).json({ success: false, message: 'unauthorized', data: null })
        }
        // Bearer sjjklagldjfklgjsdkljklsdjklgsdjkl
        const isValid = jwt.verify(token.slice(7), config.secretKey)
        console.log(isValid)
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: 'unauthorized', data: error })
    }
}

module.exports = {
    checkAuth
}