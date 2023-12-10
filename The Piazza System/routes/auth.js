const express = require('express')
const router = express.Router()

const User = require('../models/User')
const {registerValidation,loginValidation} = require('../validations/validation')

const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

// creating the register post
//validating data to see if there is an error and returns the error
router.post('/register',async(req,res)=>{
    
    const {error} = registerValidation(req.body)
    if(error){
    res.status(400).send({message:error['details'][0]['message']})
    }

    //Validating data to see if the user already exists
    const userExists = await User.findOne({email:req.body.email})
    if(userExists){
        return res.status(400).send({message:'User already exists'})
    }

    //hashed representation of the password.
    //Salt generates randomness
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(req.body.password,salt)

    //insert the data in the database if there is no error
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    })
    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send({message:err})
    }
})

router.post('/login', async(req,res)=>{

    const {error} = loginValidation(req.body)
    if(error){
     return res.status(400).send({message:error['details'][0]['message']})
    }

    // Validating to see if user exists
    const user= await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send({message:'User does not exist'})
    }
    
    // Validation to see if password is correct
    const passwordValidation = await bcryptjs.compare(req.body.password,user.password)
    if(!passwordValidation){
        return res.status(400).send({message:'Incorrect password'})
    }

    // When user is successfully connected. An Auth-token is generated that grants access
    const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token',token).send({'auth-token':token})

})

module.exports = router