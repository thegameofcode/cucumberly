'use strict';

const saveFeature = require('../../features/save_feature.js');

module.exports = () => {
    this.When(/^I request to save the feature to cucumberly$/, done => {
        const world = this.world;

        saveFeature(world, world.newFeature, done);
    });
};
