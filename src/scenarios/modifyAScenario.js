'use strict';

const updateScenarioInStorage = require('./updateScenarioInStorage.js');

module.exports = (request, response, next) => {
	updateScenarioInStorage(request.context.featureId, request.context.scenarioId, request.body).then(() => {
		response.json(200);
		return next();
	});
};
