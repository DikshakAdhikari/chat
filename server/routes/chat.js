const express= require('express');
const verifyToken = require('../middleware/auth');

const chatRouter= express.Router();

chatRouter.post('/', verifyToken, async(req,res)=> {
    try{
        console.log(req.payload);
    }catch(err){
        res.json({message:err})
    }
})

module.exports= chatRouter

