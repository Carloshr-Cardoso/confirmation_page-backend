const express = require('express');
const authController = require('./Controllers/auth')
const db = require('./models')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authController);

app.get('/', (req, res)=>{
    return res.json("Baby Shower API Running...")
})


db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{ 
        console.log("listen on Port 3001")
    });
});