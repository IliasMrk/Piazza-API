const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    username:{
        type:String,
        require:true,
        min:3,
        max:256
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
        min:6,
        max:1024
    },
    date:{
        type:Date,
        default:Date.now
    }


})

module.exports = mongoose.model('users',userSchema)