const express = require('express')
const { Confirmado } = require('../models');
const { verifyConvites } =  require('../validators/confirmado');

const router = express.Router();

router.get('/', async(req, res)=>{
    const {convidadoId} = req;
    const confirmados = await Confirmado.findAll({where: {convidadoId}})

    return res.jsonOK(confirmados)
});

router.get('/:id', async (req, res)=>{
    const {convidadoId} = req;
    const { id } = req.params;
    const convidado = await Confirmado.findOne({where: { id, convidadoId}});
    if (!convidado){
        return res.jsonNotFound();
    }

    return res.jsonOK(convidado)
});

router.post('/', verifyConvites, async (req, res)=>{
    const {convidadoId} = req;
    const { name } = req.body;

    const convidadoConfirmado = await Confirmado.create({name, convidadoId})
    
    return res.jsonOK(convidadoConfirmado,'Confirmados');
    //return res.jsonOK(name,'Confirmados');
});

router.put('/:id', async (req, res)=>{
    const {convidadoId} = req;
    const { id } = req.params;
    const { name } = req.body;

    const convidado = await Confirmado.findOne({where: { id, convidadoId}});
    if (!convidado){
        return res.jsonNotFound();
    }
    convidado.name = name;

    await convidado.save();
    
    return res.jsonOK(convidado,'Convidado Alterado');
});

router.delete('/:id', async (req, res)=>{
    const {convidadoId} = req;
    const { id } = req.params;
    const convidado = await Confirmado.findOne({where: { id, convidadoId}});
    if (!convidado){
        return res.jsonNotFound();
    }
    await convidado.destroy();
})

module.exports = router;