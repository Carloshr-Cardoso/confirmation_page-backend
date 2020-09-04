const express = require('express');
const { Convidado } = require('../models');
const { generateJwt, generateRefreshJwt } = require('../helpers/jwt');
const { convidadoSignUp, convidadoSignIn } = require('../validators/convidado');

const router = express.Router();

router.post('/sign-in', convidadoSignIn, async (req, res)=>{
    const { accessCode } = req.body;
    
    //Verify Register on DB
    const convidado = await Convidado.findOne({where: {accessCode}});
    if (!convidado){
        return res.jsonBadRequest(null, 'Convite Não Encontrado na Base de Dados')
    }





    return res.json("sign In")
})

router.post('/sign-up', convidadoSignUp, async (req, res)=>{
    const { name, accessCode, invitations } = req.body;
    
    //Verify Register on DB
    const convidado = await Convidado.findOne({where: {accessCode}});
    if (convidado){
        return res.jsonBadRequest(null, 'Codigo de Acesso já cadastrado!')
    }

    //Insert on DB 
    const newConvidado = await Convidado.create({
        name, 
        accessCode,
        invitations
    });

    const token = generateJwt({id: newConvidado.id})
    const refreshToken = generateRefreshJwt({id: newConvidado.id})

    return res.jsonOK(newConvidado, 'Convidado Criado', { token, refreshToken });
})

router.get('/admin', (req, res)=>{
    return res.json("Administration Page")
})

module.exports = router;
