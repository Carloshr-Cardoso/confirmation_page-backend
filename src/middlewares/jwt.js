const { verifyJwt, verifyRefreshJwt, getTokenFromHeaders } = require('../helpers/jwt');

const checkJwt = (req, res, next) =>{
    // /auth/sign-in
    // /auth/sign-up

    const { url:path } = req

    const excludedPaths = ['/auth/sign-in', '/auth/sign-up', '/auth/refresh']
    const isExcluded = !!excludedPaths.find(p => p.startsWith(path));
    if (isExcluded){
        return next();
    }

    console.log('is Excluded: ', isExcluded)

    const token = getTokenFromHeaders(req.headers);
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