'use strict';

const generateId = require('../../idsGenerator/generateId.js'),
	_ = require('lodash'),
	persistOnStorage = require('../../storage/persistOnStorage.js');

module.exports = (request, response, next) => {
	const scenarioId = generateId();

	persistOnStorage(assembleDocumentToPersist(scenarioId, request)).then(() => {
		response.json(201, assembleResponseBody(scenarioId));
		return next();
	});
};

function assembleResponseBody(scenarioId) {
	return {id: scenarioId};
}


function assembleDocumentToPersist(scenarioId, request) {
	return _.assign(
		request.body,
		{
			id: scenarioId,
			featureId: request.context.featureId
		});
}
