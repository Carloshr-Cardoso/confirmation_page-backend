const express = require('express')
const { Confirmado, Convidado } = require('../models');
const { verifyConvites } =  require('../validators/confirmado');

const router = express.Router();

router.get('/', async(req, res)=>{
    const {convidadoId} = req;
    const confirmados = await Confirmado.findAll({where: {convidadoId}})

    return res.jsonOK(confirmados)
});

router.get('/admin/convidados', async(req, res)=>{
    const {convidadoId} = req;
    const convidados = await Convidado.findAll({where: {role: 1}});

    return res.jsonOK(convidados, "Requisição Envidada com Sucesso");
});


router.get('/:id', async (req, res)=>{
    //const {convidadoId} = req;
    const { id } = req.params;
    const confirmados = await Confirmado.findOne({where: { id: id}});
    if (!confirmados){
        return res.jsonNotFound();
    }

    return res.jsonOK(confirmados)
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
    return res.jsonOK(true, 'Convidado Apagado');
})

module.exports = router;