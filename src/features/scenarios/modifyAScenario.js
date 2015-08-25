'use strict';

const updateInStorage = require('./../../storage/updateInStorage.js'),
	assembleDataToUpdate = require('./assembleScenarioToPersist');

module.exports = (request, response, next) => {
	updateInStorage(request.context.scenarioId, assembleDataToUpdate(request.context.scenarioId, request)).then(() => {
		response.json(200);
		return next();
	});
};
