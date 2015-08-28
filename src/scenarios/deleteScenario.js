'use strict';

const updateInStorage = require('../storage/updateInStorage.js');

module.exports = (request, response, next) => {
	const queryToFindElement = {id: request.context.featureId, 'scenarios.id': request.context.scenarioId};
	const queryToRemoveScenario = {$unset: {'scenarios.$': ''}};

	updateInStorage(queryToFindElement, queryToRemoveScenario).then(() => {
		response.json(204);
		return next();
	});
};
