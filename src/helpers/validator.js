const messages = require('../config/messages.json')

const getMessage = (path) =>{
    return messages[path] || null;
}


const getValidatorError = (error, messagePath) =>{
    if (!error){
        return null;
    }

    const errorMessages = {};

    error.details.map((detail)=>{
        const message = detail.message;
        const type = detail.type;
        const key = detail.context.key;

        const path = `${messagePath}.${key}.${type}`
        console.log(path);

        errorMessages[key] = getMessage(path) || message;
    })


    return errorMessages

}

module.exports = {getValidatorError};


const err = {
    "message": "Bad request",
    "data": null,
    "metadata": {
      "error": {
        "_original": {
          "name": "Henrique Ribeiro",
          "accessCode": "adsdadsdadadsadasa",
          "invitations": 5
        },
        "details": [
          {
            "message": "\"accessCode\" with value \"adsdadsdadadsadasa\" fails to match the required pattern: /^[a-zA-Z-0-9]{6,10}$/",
            "path": [
              "accessCode"
            ],
            "type": "string.pattern.base",
            "context": {
              "regex": {},
              "value": "adsdadsdadadsadasa",
              "label": "accessCode",
              "key": "accessCode"
            }
          }
        ]
      }
    },
    "status": 400
  }