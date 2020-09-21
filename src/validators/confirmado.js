const { Confirmado, Convidado } = require('../models');

const verifyConvites = async (req, res, next) =>{
    const convidadoId = req.convidadoId;
    console.log(convidadoId);
    const { name } = req.body;
    
    const convidado = await Convidado.findOne({where: {id:convidadoId}})
    const confirmados = await Confirmado.findAll({where: {convidadoId}})
    
    if (confirmados.length === convidado.invitations)
        return res.jsonBadRequest(null, "Limite de Convidados Excedido!")

    next();
}

module.exports = { verifyConvites };