'use strict';

const getFeatures = require('../../features/get_features.js');

module.exports = () => {
    this.When(/^I ask cucumberly to give me my features$/, done => {
        const world = this.world;
        getFeatures(world, done);
    });
};
