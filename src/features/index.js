'use strict';

const createFeature = require('./createFeature.js'),
    modifyAFeature = require('./modifyFeature.js'),
	deleteFeature = require('./deleteFeature.js');

module.exports = server => {
    server.post('/api/features', createFeature);
	server.put('/api/features/:featureId', modifyAFeature);
	server.del('/api/features/:featureId', deleteFeature);
};
