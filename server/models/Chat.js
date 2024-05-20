const { Schema } = require('mongoose');
const mongoose= require('mongoose')

const ChatSchema= new mongoose.Schema({
    chat:{
            type:String,
            required:true
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{timestamps:true});

const CHAT= new mongoose.model('chat', ChatSchema)

module.exports= CHAT
