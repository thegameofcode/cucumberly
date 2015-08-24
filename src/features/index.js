'use strict';

const createFeature = require('./createFeature.js'),
    modifyAFeature = require('./modifyFeature.js'),
    retrieveFeatures = require('./retrieveFeatures.js');

module.exports = server => {
    server.post('/api/features', createFeature);
	server.put('/api/features/:featureId', modifyAFeature);
    server.get('/api/features', retrieveFeatures);
};
