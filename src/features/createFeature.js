'use strict';

const generateId = require('../idsGenerator/generateId.js'),
    persistOnStorage = require('../storage/persistOnStorage.js');

module.exports = (request, response, next) => {
    persistOnStorage(request.body).then(() => {

        response.json(201, assembleBody());
        return next();
    });
};

function assembleBody(){
    return {
        id: generateId()
    }
}
