'use strict';

const createFeature = require('./createFeature.js'),
    modifyAFeature = require('./modifyFeature.js'),
    retrieveFeatures = require('./retrieveFeatures.js'),
	createScenario = require('./scenarios/createScenario.js');

module.exports = server => {
    server.post('/api/features', createFeature);
	server.put('/api/features/:featureId', modifyAFeature);
    server.get('/api/features', retrieveFeatures);

	server.post('/api/features/:featureId/scenarios', createScenario);
};
