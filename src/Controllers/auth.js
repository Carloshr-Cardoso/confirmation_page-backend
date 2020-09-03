const express = require('express');
const { Convidado } = require('../models')

const router = express.Router();

router.get('/sign-in', (req, res)=>{
    return res.json("sign In")
})

router.post('/sign-up', async (req, res)=>{
    const { name, accessCode, invitations } = req.body;
    
    //Verify Register on DB
    const convidado = await Convidado.findOne({where: {accessCode}});
    if (convidado){
        return res.json('Codigo de Acesso já cadastrado!')
    }

    //Insert on DB 
    const result = await Convidado.create({
        name, 
        accessCode,
        invitations
    });

    return res.json({ name, accessCode, invitations });
})

router.get('/admin', (req, res)=>{
    return res.json("Administration Page")
})

module.exports = router;
