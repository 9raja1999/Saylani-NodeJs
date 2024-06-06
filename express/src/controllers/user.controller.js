const jwt = require('jsonwebtoken')
const { findByEmail, createUser, saveToken, getTokenByUID, deleteTokensByUID, UpdateUserByEmail } = require('../services/user.service.js');
const { createHash, compareHash } = require('../utils/hash.util.js');
const { config } = require('../configs/server.config.js');
const { generateOtp } = require('../utils/randomString.util.js');
const { sendEmail } = require('../services/mail.service.js');

const login = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await findByEmail(email)
        if (!user) return res.status(500).json({ success: false, message: 'invalid creds', data: null })

        if (!user.isActive) return res.status(500).json({ success: false, message: 'plz verify your account first', data: null })
        const isAlreadyLoggedin = await getTokenByUID(user.id)
        if (isAlreadyLoggedin?.length > 0) return res.status(500).json({ success: false, message: 'already logged in', data: null })

        const passwordMatch = await compareHash(password, user.password)
        if (!passwordMatch) return res.status(500).json({ success: false, message: 'invalid creds', data: null })

        const token = jwt.sign({ email: user.email, username: user.username }, config.secretKey, { expiresIn: '1h' })

        const generateToken = await saveToken({ token, user: user.id })


        return res.status(200).json({ success: true, message: 'success', data: { token: generateToken.token } })
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
            password: hashedPassword,
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


const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body

        const user = await findByEmail(email)
        if (!user) return res.send('unprocessible request')

        if (user.otp !== otp) return res.send('invalid otp')

        const response = await UpdateUserByEmail(user.email)
        return res.send("otp verified")
    } catch (error) {
        return res.send("Something went wrong")
    }
}

const logout = async (req, res) => {
    try {
        const { uid } = req.body
        const logoutUser = await deleteTokensByUID(uid)
        if (logoutUser.deletedCount === 0) {
            return res.status(500).json({ success: false, message: 'already logged in', data: null })
        }

        return res.status(200).json({ success: true, message: 'succesfully logged out', data: null })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something went wrong', data: null })
    }
}


module.exports = {
    login,
    signup,
    logout,
    verifyOtp
}