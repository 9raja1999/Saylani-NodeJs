const mongoose = require('mongoose')
const { generateOtp } = require('../utils/randomString.util')
const { sendEmail } = require('../services/mail.service')

const { Schema } = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


UserSchema.pre('save', function (next) {
    if (!this.otp) {
        this.otp = generateOtp()
        sendEmail({
            to: this.email,
            subject: 'Your otp',
            text: `Your otp is ${this.otp}`
        }).then(res => console.log(`Success sending email to ${this.email}`))
            .catch(err => console.log(`Error sending email to ${this.email}`))
    }
    next()
})

const UserModel = mongoose.model('User', UserSchema)
// User => users

module.exports = UserModel




