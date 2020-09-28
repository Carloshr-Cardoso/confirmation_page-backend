const express = require('express');
const { Convidado } = require('../models');
const { generateJwt, generateRefreshJwt, verifyRefreshJwt, getTokenFromHeaders } = require('../helpers/jwt');
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

router.put('/edit', async (req, res)=>{
    const {convidadoId} = req;
    const { confirmado } = req.body;

    const convidado = await Convidado.findOne({where: { id: convidadoId}});
    if (!convidado){
        return res.jsonNotFound();
    }
    convidado.confirmado = confirmado;

    await convidado.save();
    
    return res.jsonOK(convidado,'Convidado Alterado');
});


router.post('/refresh', async (req, res) =>{
    const token = getTokenFromHeaders(req.headers)

    if (!token){
        return res.jsonUnauthorized(null, 'Token Inválido')
    }

    try{
        const decoded = verifyRefreshJwt(token);
        const convidado = await Convidado.findByPk(decoded.id);
        if(!convidado){
            return res.jsonUnauthorized(null, 'Token Inválido')
        }
        if (decoded.version != convidado.jwtVersion){
            return res.jsonUnauthorized(null, 'Token Inválido')
        }
        const meta = {
            token: generateJwt({id: convidado.id})
        };

        return res.jsonOK(null, null, meta);

    }catch(err){
        return res.jsonUnauthorized(null, 'Token Inválido')
    }


})

router.get('/admin', (req, res)=>{
    return res.json("Administration Page")
})

module.exports = router;
