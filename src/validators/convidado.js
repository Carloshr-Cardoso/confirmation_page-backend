const Joi = require('joi');
const { getValidatorError } = require('../helpers/validator');

const rules = {
    name: Joi.string().required(),
    accessCode: Joi.string().pattern(new RegExp('^[a-zA-Z-0-9]{6,10}$')).required(),
    invitations: Joi.number()
                .integer()
                .min(1)
                .max(10),
};

const convidadoSignIn = (req, res, next) =>{
    const { accessCode } = req.body;

    const schema = Joi.object({
        accessCode: rules.accessCode,
    })

    const options = {abortEarly: false}
    const {error} = schema.validate({ accessCode }, options)
    if (error){
        messages = getValidatorError(error);
        return res.jsonBadRequest(null, null, {error: messages})
    }


    next();
};


const convidadoSignUp = (req, res, next) =>{
    const { name, accessCode, invitations } = req.body;

    const schema = Joi.object({
        name: rules.name,
        accessCode: rules.accessCode,
        invitations: rules.invitations,
    })

    const options = {abortEarly: false}
    const {error} = schema.validate({ name, accessCode, invitations }, options)
    if (error){
        messages = getValidatorError(error, 'convidado.signup');
        return res.jsonBadRequest(null, null, {error: messages})
    }


    next();
};

module.exports = { convidadoSignUp, convidadoSignIn }