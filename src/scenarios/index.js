'use strict';

const createScenario = require('./createScenario.js'),
	modifyAScenario = require('./modifyAScenario.js'),
	deleteScenario = require('./deleteScenario.js');

module.exports = server => {
	server.post('/api/features/:featureId/scenarios', createScenario);
	server.put('/api/features/:featureId/scenarios/:scenarioId', modifyAScenario);
	server.del('/api/features/:featureId/scenarios/:scenarioId', deleteScenario);
};
