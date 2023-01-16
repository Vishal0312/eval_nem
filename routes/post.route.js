const express = require('express')
const { PostModel } = require('../models/post.model')

const postRouter = express.Router()

postRouter.get('/',async(req,res)=>{
    const query = req.query
    try{
        const data = await PostModel.find(query)
        res.send(data)
    }catch(err){
        res.send("No error")   
    }
})

postRouter.post('/create',async(req,res)=>{
    const data = req.body
    try{
        const post = new PostModel(data)
        await post.save()
        res.send("Post is added successfully")
    }catch(err){
        console.log(err)
        res.send("Something went wrong")
    }
})

postRouter.patch('/update/:id',async(req,res)=>{
    const payload = req.body
    const ID = req.params.id
   try{
            await PostModel.findByIdAndUpdate({_id:ID},payload)
            res.send("Post is updated")
    }catch(err){
        res.send("Something went wrong")
        console.log(err)
    }
})

postRouter.delete('/delete/:id',async(req,res)=>{
    const ID = req.params.id
    try{
            await PostModel.findByIdAndDelete({_id:ID})
            res.send("Post is updated")
    }catch(err){
        res.send("Something went wrong")
        console.log(err)
    }
})

module.exports={
    postRouter
}