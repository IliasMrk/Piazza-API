const mongoose = require('mongoose')

const interactionSchema = mongoose.Schema({
    postId:{
        type:String
    },
    username:{
        type:mongoose.Schema.Types.ObjectId, ref:'User'
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
        
    }],
    time_left:{
        type:Number
    }



})

module.exports = mongoose.model('interactions',interactionSchema)