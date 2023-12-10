//importing the necessary libraries
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())

//routing endpoint
const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')



//direct endpoint
app.use('/api/posts',postsRoute)
app.use('/api/user',authRoute)




// connecting to database
mongoose.connect(process.env.DB_CONNECTOR).then (()=>{
    console.log('DB is now connected')
})

// checking if server works and listens to port 3000
app.listen(3000, ()=>{
    console.log('Server is up and running')
})