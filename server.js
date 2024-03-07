require('dotenv').config()

const mongoose = require('mongoose');
const app = require('./app')


mongoose
    .connect('mongodb://127.0.0.1:27017/budget-api')
    .then(()=>{
        app.listen(3001, ()=>{
            console.log('Server started on Port: 3001');
        })
        console.log(('MONGO DB CONNECTED'));
    })
    .catch(e=>{
        console.log(e);
    })

