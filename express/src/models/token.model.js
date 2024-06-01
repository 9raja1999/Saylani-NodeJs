const mongoose = require('mongoose')

const { Schema } = mongoose

const TokenSchema = new Schema({
    token : {
        type: String,
        required: true
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, {timestamps : true})


const TokenModel = mongoose.model('Token', TokenSchema)
// User => users

module.exports = TokenModel




