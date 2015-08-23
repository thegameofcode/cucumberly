'use strict';

const retrieveFromStorage = require('./../storage/retrieveFromStorage.js');

module.exports = (request, response, next) => {
    retrieveFromStorage({}).then(storageResponse => {
        response.json(200, storageResponse);
        return next();
    });
};
