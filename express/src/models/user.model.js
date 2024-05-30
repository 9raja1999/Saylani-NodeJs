const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
    username : String,
    password : String,
    photo : String,
    address : String
})


const UserModel = mongoose.model('User', UserSchema)

module.exports = {
    UserModel
}




