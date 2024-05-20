const express= require('express');
const verifyToken = require('../middleware/auth');
const CHAT = require('../models/Chat');

const chatRouter= express.Router();

chatRouter.post('/', verifyToken, async(req,res)=> {
    try{
        const senderId= req.payload.user.id
        const chat=req.body.message
        const saveChat= await CHAT.create({
            chat, senderId
        })
        await saveChat.save();
        res.json("Chat saved successfully!")
    }catch(err){
        res.json({message:err})
    }
});

chatRouter.get('/', verifyToken, async (req,res)=> {
    try{
        const allChats= await CHAT.find().populate("senderId")
        
        res.status(200).json(allChats);
    }catch(err){
        res.json({message:err})
    }
})

module.exports= chatRouter

