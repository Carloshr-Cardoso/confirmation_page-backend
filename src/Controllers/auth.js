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
        //console.log(getMessages('convidado.signin.accessCodeNotFound'))
        return res.jsonBadRequest(null, 'Código de Acesso Inválido')
    }
 
    const token = generateJwt({id: convidado.id})
    const refreshToken = generateRefreshJwt({ id: convidado.id, version:convidado.jwtVersion })


    return res.jsonOK(convidado, 'Login Efetuado com Sucesso', { token, refreshToken })
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
    const refreshToken = generateRefreshJwt({ id: newConvidado.id, version: newConvidado.jwtVersion })

    return res.jsonOK(newConvidado, 'Convidado Criado Com Sucesso', { token, refreshToken });
})

router.get('/admin', (req, res)=>{
    return res.json("Administration Page")
})

module.exports = router;
