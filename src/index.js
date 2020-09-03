const express = require('express');
const authController = require('./Controllers/auth')
const app = express();


app.use('/auth', authController);

app.get('/', (req, res)=>{
    return res.json("Baby Shower API Running...")
})

app.listen(3001, ()=>{ 
    console.log("listen on Port 3001")
})