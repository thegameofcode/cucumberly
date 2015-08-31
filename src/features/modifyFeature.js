'use strict';

const updateFeatureInStorage = require('./updateFeatureInStorage.js');

module.exports = (request, response, next) => {
	updateFeatureInStorage(request.context.featureId, request.body).then(() => {
		response.json(200);
		return next();
	});
};
