'use strict';

const _ = require('lodash'),
	persistScenarioInStorage = require('./persistScenarioInStorage.js');

module.exports = (request, response, next) => {
	persistScenarioInStorage(request.context.featureId, request.body).then(scenarioPosition => {
		response.json(201, {id: 0});
		return next();
	});
};
