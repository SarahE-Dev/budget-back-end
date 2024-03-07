const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    income: [{type: mongoose.Schema.Types.ObjectId, ref: 'income'}]
    ,
    expenses: [{type: mongoose.Schema.Types.ObjectId, ref: 'expense'}]
})

module.exports = mongoose.model('user', UserSchema)