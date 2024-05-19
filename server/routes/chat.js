const express= require('express');
const verifyToken = require('../middleware/auth');

const chatRouter= express.Router();

chatRouter.post('/', verifyToken, async(req,res)=> {
    try{
        console.log(req.payload);
        res.json("Chat saved successfully!")
    }catch(err){
        res.json({message:err})
    }
})

module.exports= chatRouter

