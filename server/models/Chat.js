const mongoose= require('mongoose')

const ChatSchema= new mongoose.Schema({
    chat:{
            type:String,
            required:true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
},{timestamps:true});

const CHAT= new mongoose.model('chat', ChatSchema)

module.exports= CHAT
