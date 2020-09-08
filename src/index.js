const express = require('express');
const authController = require('./controllers/auth')
const confirmedController = require('./controllers/confirmado')
const db = require('./models')
const response = require('./middlewares/response')

const app = express();

app.use(response);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authController);
app.use('/confirmed', confirmedController);

app.get('/', (req, res)=>{
    return res.json("Baby Shower API Running...");
})


db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{ 
        console.log("listen on Port 3001")
    });
});