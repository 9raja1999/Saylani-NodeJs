const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required : true
    },
    email: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    isActive : {
        type : Boolean,
        default: false
    }
}, {timestamps : true})


const UserModel = mongoose.model('User', UserSchema)
// User => users

module.exports = UserModel




