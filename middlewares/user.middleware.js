const jwt = require('jsonwebtoken')
require('dotenv').config()


const authenticate=(req,res,next)=>{
    const token = req.headers.token;
    if(token){
        const decoded = jwt.verify(token,process.env.key)
        if(decoded){
            next()
        }else{
            res.send("You are not authorised")
        }
    }else{
        res.send('You are not authorised')
    }

}

module.exports={
    authenticate
}