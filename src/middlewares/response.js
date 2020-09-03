const TYPE_JSON = 'application/json'

const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_SERVER_ERROR = 500;

const jsonOK = function(data, message, metadata){

    message = (message) ? message : 'Requisição bem Sucedida'
    metadata = (metadata) ? metadata : []
    status = STATUS_CODE_OK

    this.status(STATUS_CODE_OK);
    this.type('application/json');
    return this.json({message, data, metadata, status})
}

const jsonBadRequest = function(data, message, metadata){

    message = (message) ? message : 'Bad request'
    metadata = (metadata) ? metadata : []
    status = STATUS_CODE_BAD_REQUEST

    this.status(STATUS_CODE_BAD_REQUEST);
    this.type('application/json');
    return this.json({message, data, metadata, status})
}

const jsonNotFound = function(data, message, metadata){

    message = (message) ? message : 'Not Found'
    metadata = (metadata) ? metadata : []
    status = STATUS_CODE_NOT_FOUND

    this.status(STATUS_CODE_NOT_FOUND);
    this.type('application/json');
    return this.json({message, data, metadata, status})
}

const jsonUnauthorized = function(data, message, metadata){

    message = (message) ? message : 'Unauthorized'
    metadata = (metadata) ? metadata : []
    status = STATUS_CODE_UNAUTHORIZED
    this.status(STATUS_CODE_UNAUTHORIZED);
    this.type('application/json');
    return this.json({message, data, metadata, status})
}

const jsonServerError = function(data, message, metadata){

    message = (message) ? message : 'Server Error'
    metadata = (metadata) ? metadata : []
    status = STATUS_CODE_SERVER_ERROR

    this.status(STATUS_CODE_SERVER_ERROR);
    this.type('application/json');
    return this.json({message, data, metadata, status})
}


const response = (req, res, next)=> {
    res.jsonOK = jsonOK;
    res.jsonBadRequest = jsonBadRequest;
    res.jsonNotFound = jsonNotFound;
    res.jsonUnauthorized = jsonUnauthorized;
    res.jsonServerError = jsonServerError;

    next();
}

module.exports = response;