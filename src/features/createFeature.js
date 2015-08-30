'use strict';

const generateId = require('../idsGenerator/generateId.js'),
	_ = require('lodash'),
    persistOnStorage = require('../storage/persistOnStorage.js');

module.exports = (request, response, next) => {
    if (request.body.name === undefined) {response.json(409, {error: 'missing name'}); return next()}

	const featureId = generateId();
    persistOnStorage(assembleDocumentToPersist(featureId, request)).then(() => {
        response.json(201, assembleResponseBody(featureId));
        return next();
    });
};

function assembleResponseBody(featureId){
    return { id: featureId };
}

function assembleDocumentToPersist(featureId, request) {
	return _.assign({id: featureId}, request.body);
}
