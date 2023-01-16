require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../models/user.model')

const userRouter = express.Router()

userRouter.post('/register',async(req,res)=>{
    console.log(req.body)
    const {name,email,gender,password} = req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log(err)
                res.send("Error occured while registering")
            }else{
                const user = new UserModel({name,email,gender,password:hash})
                await user.save()
                res.send("User has registered successfully")
            }
        })
    }catch(err){
        console.log(err)
        res.send("Something went wrong while registering")
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body
    
    try{
        const user = await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token = jwt.sign({course:'backend'}, process.env.key)
                    res.send({"msg":"Login successfull","token":token})
                }
            })
        }else{
            res.send('Wrong credentials')
        }
        
    }catch(err){
        console.log(err)
        res.send("Something went wrong while logging in")
    }

})



module.exports={
    userRouter
}