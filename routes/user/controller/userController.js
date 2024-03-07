const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const mongoose = require('mongoose')
require('dotenv').config()
const Expense = require('../../expense/model/Expense')


async function signup(req, res){
    try {
        
        const encrypted = await bcrypt.hash(req.body.password, 8)
        const createdUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: encrypted
        })
        const jwtToken = jwt.sign({
            username: createdUser.username,
            email: createdUser.email,
            id: createdUser._id
        }, process.env.JWT_SECRET_KEY)

        res.cookie('jwt-cookie', jwtToken, {
            expires: new Date(Date.now()+ 3600000),
            httpOnly: false,
            secure: false
        })
        res.json({
            user: {
                email:
                createdUser.email,
                username:
                createdUser.username,
                id: createdUser._id
            }
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function login(req, res){
    try {
        const foundUser = await User.findOne({username: req.body.username});
        if(!foundUser){
            throw Error('User not found, please sign up.')
        }
        const passwordMatch = await bcrypt.compare(req.body.password, foundUser.password)
        if(!passwordMatch){
            throw Error('Check email and/or password')
        }
        const jwtToken = jwt.sign({
            username: foundUser.username,
            email: foundUser.email,
            id: foundUser._id
        }, process.env.JWT_SECRET_KEY)

        res.cookie('jwt-cookie', jwtToken, {
            expires: new Date(Date.now()+ 3600000),
            httpOnly: false,
            secure: false
        })
        res.json({
            user: {
                email:
                foundUser.email,
                username:
                foundUser.username,
                id: foundUser._id
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function getUsers(req, res){
    try {
        const users = await User.find({});
        res.json(users)
    } catch (error) {
        res.json(error.message)
    }
}

async function getUserData(req, res){
    try {
        const userExpenses = await User.findOne({_id: req.params.id}).populate('expenses').populate('income').exec()
        res.json(userExpenses)
    } catch (error) {
        res.json(error)
    }
}

async function updateUserFunction(req, res){
    try {
        const updatedUser = await User.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
        const jwtToken = jwt.sign({
            username: updatedUser.username,
            email: updatedUser.email,
            id: updatedUser._id
        }, process.env.JWT_SECRET_KEY)
        res.cookie('jwt-cookie', jwtToken, {
            expires: new Date(Date.now()+ 3600000),
            httpOnly: false,
            secure: false
        })
        res.json({
            user: {
                email:
                updatedUser.email,
                username:
                updatedUser.username,
                id: updatedUser._id
            }
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {signup, getUsers, login, getUserData, updateUserFunction}

