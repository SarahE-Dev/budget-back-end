const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    }
})


module.exports = mongoose.model('income', IncomeSchema)