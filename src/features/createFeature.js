'use strict';

const generateId = require('../idsGenerator/generateId.js');

module.exports = (request, response, next) => {
    response.json(201, assembleBody());
    return next();
};

function assembleBody(){
    return {
        id: generateId()
    }
}
