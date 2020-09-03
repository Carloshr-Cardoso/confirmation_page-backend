const express = require('express');
const { Convidado } = require('../models')

const router = express.Router();

router.get('/sign-in', (req, res)=>{
    return res.json("sign In")
})

router.get('/sign-up', async (req, res)=>{
    //const {name, accessCode, invitations} = req.body;
    const name = 'Carlos Cardoso';
    const accessCode = 'a34785'
    const invitations = 3;
    const result = await Convidado.create({
        name, 
        accessCode,
        invitations
    });

    return res.json(result);
})

router.get('/admin', (req, res)=>{
    return res.json("Administration Page")
})

module.exports = router;
