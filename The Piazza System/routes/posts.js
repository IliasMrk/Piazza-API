const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verify = require('../verifyToken')
const Interaction = require('../models/Interaction')
const User = require('../models/User')



//POST data (posting on the wall)
router.post('/', verify, async(req,res)=>{


        const postData = new Post({
        userId:req.params.userId,
        username:req.body.username,
        title:req.body.title,
        topic:req.body.topic,
        timestamp:req.body.timestamp,
        message:req.body.message,
        expiration:req.body.expiration,
        status:req.body.status
            
    
            
    })

    // try to insert the data

    try{
        const postToSave = await postData.save()
        res.send(postToSave)
    }
    catch(err){
        res.send({message:err})
    }
})



// POST data (liking a post)
router.post('/:postId/interaction/like',verify,async(req,res)=>{
    const { postId} = req.params
    const {userId,username} = req.body
    
   
    try {
        const post = await Post.findById(postId)
        const user = await User.findById(userId)
       
        const interactionsData = new Interaction({
            postId:postId,
            username:username,
            likes:post.likes,
            dislikes:post.dislikes,
            comments:post.comments
    
            
        })
    
        if (!post) {
            return res.status(404).send({ message: 'post not found' })}
        else if (post.username === username) {
            return res.status(404).send({ message: 'Users cannot like their own post' })
        }
    
      

      post.likes++

      await post.save()
      await interactionsData.save()
        
        res.send({message:'Post Liked Successfully',interactionsData})
    } catch (error) {
         res.status(400).send({ message: 'Error liking post'});
    }

})




//POST data (disliking a post)
router.post('/:postId/interaction/dislike',verify,async(req,res)=>{
    const { postId } = req.params
    const {userId} = req.params
    try {
        const post = await Post.findById(postId)
        const user = await User.findById(userId)

        const interactionsData = new Interaction({
            postId:postId,
            username:req.body.username,
            likes:post.likes,
            dislikes:post.dislikes,
            comments:post.comments
    
            
        })

        if (!post) {
            return res.status(404).send({ message: 'post not found' })}
        else if (user) {
            return res.status(404).send({ message: 'Users cannot dislike their own post' })
        }

      post.dislikes++
      
      
      
        await post.save()
        await interactionsData.save()
        
        res.send({message:'Post Disliked Successfully',interactionsData})
    } catch (error) {
         res.status(400).send({ message: 'Error disliking post'});
    }
})


//POST data (commenting a post)

router.post('/:postId/interaction/comment',verify,async(req,res)=>{
    const { postId } = req.params
    
   
    
    try {
        const post = await Post.findById(postId)
      
        const interactionsData = new Interaction({
            postId:postId,
            username:req.params.username,
            likes:post.likes,
            dislikes:post.dislikes,
            comments:req.body.comments
    
            
        })
        if (!post) {
            return res.status(404).send({ message: 'post not found' })
      }  

       

        //pushing the users comment into the comments array in posts
        post.comments.push(req.body.comments)
        
        await post.save()
        await interactionsData.save()
        
        res.send({message:'Post Commented Successfully',interactionsData,post})
    } catch (error) {
         res.status(400).send({ message: 'Error commenting post'});
    }
})




    //GET all data (getting all posts)
    router.get('/', verify,  async(req,res)=>{
        try{
            const getPosts = await Post.find()
            res.send(getPosts)

        }catch(err){
            res.send({message:err})
        }
    })
   

   

   

    //GET data by topic (gets a post by topic)
    router.get('/:topic',verify, async(req,res)=>{
        try{
            const getPostbyTopic = await Post.find(req.params.topic)
            res.send(getPostbyTopic)

        }catch(err){
            res.send({message:err})
        }
    })



  
module.exports = router