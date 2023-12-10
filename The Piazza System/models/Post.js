const mongoose = require('mongoose')

const { object } = require('joi')

const postSchema = mongoose.Schema({
    postId:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
        
      
    },
    username:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    topic:{
       type:String,
       required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    },
    message:{
        type:String,
        required:true
    },
    expiration:{
        type:Date,
        expires:Number,
        default:Date.now
    },
    status:{
        type: String, 
        default:'Live'
    },
    likes:{
        type:Number,
        default:0
       
    },
    dislikes:{
        type:Number,
        default:0
    },
    comments:[{
        type:String,
        default: "No comments"
        
    }],
    time_left:{
        
    }



})

module.exports = mongoose.model('posts',postSchema)