'use strict';

const generateId = require('../../idsGenerator/generateId.js'),
	_ = require('lodash'),
	assembleScenarioToPersist = require('./assembleScenarioToPersist.js'),
	persistOnStorage = require('../../storage/persistOnStorage.js');

module.exports = (request, response, next) => {
	const scenarioId = generateId();

	persistOnStorage(assembleScenarioToPersist(scenarioId, request)).then(() => {
		response.json(201, assembleResponseBody(scenarioId));
		return next();
	});
};

function assembleResponseBody(scenarioId) {
	return {id: scenarioId};
}
