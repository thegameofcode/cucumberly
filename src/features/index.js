'use strict';

const createFeature = require('./createFeature.js');

module.exports = server => {
    server.post('/api/features', createFeature);
};
