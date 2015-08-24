'use strict';

const generateId = require('../idsGenerator/generateId.js'),
    persistOnStorage = require('../storage/persistOnStorage.js');

module.exports = (request, response, next) => {
    if (request.body.name === undefined) {response.json(409, {error: 'missing name'}); return next()}

    persistOnStorage(request.body).then(() => {
        response.json(201, assembleResponseBody());
        return next();
    });
};

function assembleResponseBody(){
    return {
        id: generateId()
    }
}
