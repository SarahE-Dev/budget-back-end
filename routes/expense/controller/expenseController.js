const User = require('../../user/model/User')
const Expense = require('../model/Expense')


async function createExpense(req, res){
    try {
        
        const newExpense = await Expense.create(req.body)
    const updateUser = await User.findOneAndUpdate({_id: req.body.user}, {$push: {expenses: newExpense._id}}, {new: true})
        res.json({newExpense, updateUser})
    } catch (error) {
        res.status(500).json({error})
    }
}

async function findExpenses(req, res){
    try {
        
        const userExpenses = await Expense.find({user: req.params.id}).populate('user').exec()
        res.json(userExpenses)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function deleteExpense(req, res){
    try {
        const deletedExpense = await Expense.deleteOne({_id: req.body.id});
        const updatedUser = await User.findByIdAndUpdate({_id: req.body.user}, {$pull: {expenses: req.body._id}}, {new: true})
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function updateExpense(req, res){
    try {
        const updatedExp = await Expense.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        res.json(updatedExp)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {createExpense, deleteExpense, updateExpense}