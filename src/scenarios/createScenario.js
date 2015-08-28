'use strict';

const _ = require('lodash'),
	generateId = require('../idsGenerator/generateId.js'),
	persistScenarioInStorage = require('./persistScenarioInStorage.js');

module.exports = (request, response, next) => {
	const scenarioId = generateId();
	persistScenarioInStorage(request.context.featureId, _.assign({id: scenarioId}, request.body)).then(() => {
		response.json(201, {id: scenarioId});
		return next();
	});
};
