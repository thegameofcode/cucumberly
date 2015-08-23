'use strict';

const createFeature = require('./createFeature.js'),
    retrieveFeatures = require('./retrieveFeatures.js');

module.exports = server => {
    server.post('/api/features', createFeature);
    server.get('/api/features', retrieveFeatures);
};
