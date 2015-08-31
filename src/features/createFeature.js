'use strict';

const generateId = require('../idsGenerator/generateId.js'),
	_ = require('lodash'),
    persistFeatureOnStorage = require('./persistFeatureOnStorage.js');

module.exports = (request, response, next) => {
    if (request.body.name === undefined) {response.json(409, {error: 'missing name'}); return next()}

	const featureId = generateId();
    persistFeatureOnStorage(request.context.bookId, request.context.episodeId, featureId, request.body).then(() => {
        response.json(201, assembleResponseBody(featureId));
        return next();
    });
};

function assembleResponseBody(featureId){
    return { id: featureId };
}
