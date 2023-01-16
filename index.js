const express = require('express')
const { connection } = require('./config/db')
const { postRouter } = require('./routes/post.route')
const { userRouter } = require('./routes/user.route')
const {authenticate} = require('./middlewares/user.middleware')
require('dotenv').config()



const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Starting the server to work')
})

app.use('/users',userRouter)
app.use(authenticate)
app.use('/posts', postRouter)



app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("Connection eshtablished")
    }catch(err){
        console.log(err)
    }
})