const express = require('express');
const router = express.Router()

const {addIncome, deleteIncome, updateIncome} = require('../income/controller/incomeController')

router.post('/add-income', addIncome)

router.put('/delete-income', deleteIncome)

router.put('/update-income/:id', updateIncome)

module.exports = router