const express = require('express')
const router = express.Router()
require('dotenv').config()
const basic = require('../middleware/basic')
const {users_model}=require('../models/index')
const bcrypt = require('bcrypt')

router.post('/signup',handleSignup)
router.post('/signin',basic,handleSignin)

async function handleSignup (req,res){
    try{
        const { password, email } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const record = await users_model.create({
        ...req.body,
        password: hashedPassword,
        });
        res.json('user has been added')
    }
    catch(err){
        res.status(400).json(err)
    }
}

async function handleSignin (req,res){
    try{
        if(req.user){
            res.json(req.user)
        }
    }
    catch(err){
        res.json(err)
    }
}



module.exports = router