const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Utilities', 'Transportation', 'Shopping', 'Housing', 'Groceries', 'Other', 'Eating Out']
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('expense', ExpenseSchema)