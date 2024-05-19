const mongoose= require('mongoose')

const ChatSchema= new mongoose.Schema({
    chat:{
        text:{
            type:String,
            required:true
        },
    },
    userId: {
        type:String,
        required:true
    }
},{timestamps:true});

const CHAT= new mongoose.model('chat', ChatSchema)

module.exports= CHAT
