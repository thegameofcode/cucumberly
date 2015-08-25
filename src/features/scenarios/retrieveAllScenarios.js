'use strict';

const retrieveFromStorage = require('./../../storage/retrieveFromStorage.js'),
	assembleResponseBody = require('./assembleResponseBody.js');

module.exports = (request, response, next) => {
	retrieveFromStorage({featureId: request.context.featureId}).then(scenarios => {
		response.json(200, assembleResponseBody(scenarios));
		return next();
	});
};
