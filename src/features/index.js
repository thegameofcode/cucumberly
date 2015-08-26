'use strict';

const createFeature = require('./createFeature.js'),
    modifyAFeature = require('./modifyFeature.js'),
    retrieveFeatures = require('./retrieveFeatures.js'),
	deleteFeature = require('./deleteFeature.js'),
	deleteAllFeatures = require('./deleteAllFeatures.js'),

	createScenario = require('./scenarios/createScenario.js'),
	retrieveAllScenarios = require('./scenarios/retrieveAllScenarios.js'),
	modifyAScenario = require('./scenarios/modifyAScenario.js'),
	deleteScenario = require('./scenarios/deleteScenario.js');

module.exports = server => {
    server.post('/api/features', createFeature);
	server.get('/api/features', retrieveFeatures);
	server.del('/api/features', deleteAllFeatures);
	server.put('/api/features/:featureId', modifyAFeature);
	server.del('/api/features/:featureId', deleteFeature);

	server.post('/api/features/:featureId/scenarios', createScenario);
	server.get('/api/features/:featureId/scenarios', retrieveAllScenarios);
	server.put('/api/features/:featureId/scenarios/:scenarioId', modifyAScenario);
	server.del('/api/features/:featureId/scenarios/:scenarioId', deleteScenario);
};
