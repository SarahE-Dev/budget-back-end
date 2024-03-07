const Income = require('../model/Income')
const User = require('../../user/model/User')

async function addIncome(req, res){
    try {
        const newIncome = await Income.create(req.body);
        const updatedUser = await User.findOneAndUpdate({_id: req.body.user}, {$push: {income: newIncome._id}}, {new: true})
        res.json({newIncome, updatedUser})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function deleteIncome(req, res){
    try {
        const deletedIncome = await Income.deleteOne({_id: req.body.id});
        const updatedUser = await User.findByIdAndUpdate({_id: req.body.user}, {$pull: {income: req.body._id}}, {new: true})
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function updateIncome(req, res){
    try {
        const updatedIncome = await Income.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        res.json(updatedIncome)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {addIncome, deleteIncome, updateIncome}