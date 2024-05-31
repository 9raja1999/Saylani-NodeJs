const mongoose = require('mongoose')

const { Schema , Collection} = mongoose

const TodoItemsSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    isCompleted : {
        type : Boolean,
        default : false
    }
},{timestamps : true})

const TodoItemsModel = mongoose.model('todoItem', TodoItemsSchema)

module.exports = TodoItemsModel

