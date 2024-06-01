const jwt = require('jsonwebtoken')
const { findByEmail, createUser, saveToken } = require('../services/user.service.js');
const { createHash, compareHash } = require('../utils/hash.util.js');
const { config } = require('../configs/server.config.js');

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await findByEmail(email)
        if (!user) return res.send('Invalid credentials')


        const passwordMatch = await compareHash(password, user.password)
        if (!passwordMatch) return res.send('Invalid credentials')

        const token = jwt.sign({ email: user.email, username: user.username }, config.secretKey, { expiresIn: '1h' })

        const generateToken = await saveToken({ token, user: user.id })

        
        res.send(token)
    } catch (error) {
        res.send("Something went wrong")
    }
}
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const user = await findByEmail(email)
        if (user) {
            return res.send("Email already exists")
        }

        const hashedPassword = await createHash(password)

        const payload = {
            username,
            email,
            password: hashedPassword
        }
        const newUser = await createUser(payload)
        if (!newUser) {
            return res.send('Something went wrong')
        }
        return res.send("success")
    } catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
}


module.exports = {
    login,
    signup
}