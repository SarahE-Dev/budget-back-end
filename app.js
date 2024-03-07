const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');

const userRouter = require('./routes/user/UserRouter')

const ExpenseRouter = require('./routes/expense/ExpenseRouter');

const IncomeRouter = require('./routes/income/IncomeRouter')

require('dotenv').config()

let originURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : "DEPLOYMENT ADDRESS"
console.log(originURL);

const app = express();



app.use(logger('dev'));
app.use(express.json());

app.use(cors({origin: originURL, credentials: true}))

app.use('/api/user', userRouter)
app.use('/api/income', IncomeRouter)
app.use('/api/expense', ExpenseRouter)


module.exports = app