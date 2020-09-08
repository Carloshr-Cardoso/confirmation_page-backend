const { verifyJwt, verifyRefreshJwt } = require('../helpers/jwt');

const checkJwt = (req, res, next) =>{
    let token = req.headers['authorization'];
    token = token ? token.slice(7, token.length) : null;
    if (!token){
        return res.jsonUnauthorized(null, 'Token Inválido')
    }

    try{
        const decoded = verifyJwt(token);
        req.convidadoId = decoded.id;
        next();
    }catch(err){
        return res.jsonUnauthorized(null, 'Token Inválido')
    }

};

module.exports = checkJwt;