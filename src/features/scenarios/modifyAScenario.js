'use strict';

const updateInStorage = require('./../../storage/updateInStorage.js');

module.exports = (request, response, next) => {
	updateInStorage(request.context.scenarioId, request.body).then(() => {
		response.json(200);
		return next();
	});
};
