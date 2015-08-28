'use strict';

const createFeature = require('./createFeature.js'),
    modifyAFeature = require('./modifyFeature.js'),
    retrieveFeatures = require('./retrieveFeatures.js'),
	deleteFeature = require('./deleteFeature.js'),
	deleteAllFeatures = require('./deleteAllFeatures.js');

module.exports = server => {
    server.post('/api/features', createFeature);
	server.get('/api/features', retrieveFeatures);
	server.del('/api/features', deleteAllFeatures);
	server.put('/api/features/:featureId', modifyAFeature);
	server.del('/api/features/:featureId', deleteFeature);
};
