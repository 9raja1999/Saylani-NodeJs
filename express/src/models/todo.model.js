const mongoose = require('mongoose')

const { Schema , Collection} = mongoose

const TodoSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    isCompleted : {
        type : Boolean,
        default : false
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps : true})

const TodoModel = mongoose.model('todo', TodoSchema)

module.exports = TodoModel

