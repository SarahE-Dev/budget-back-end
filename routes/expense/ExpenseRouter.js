const express = require('express');
const router = express.Router()

const {createExpense, deleteExpense, updateExpense} = require('./controller/expenseController')

router.post('/create-expense', createExpense)

router.put('/delete-expense', deleteExpense)

router.put('/update-expense/:id', updateExpense)

module.exports = router