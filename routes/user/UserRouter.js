const express = require('express');
const router = express.Router();

const {signup, getUsers, login, getUserData, updateUserFunction} = require('./controller/userController')

router.post('/create-user', signup)

router.get('/get-users', getUsers)

router.post('/login', login)

router.get('/get-data/:id', getUserData)

router.put('/update-user/:id', updateUserFunction)

router.get('/logout', (req, res)=>{
    res.clearCookie('jwt-cookie')
    res.send('Logged out.')
})

module.exports = router