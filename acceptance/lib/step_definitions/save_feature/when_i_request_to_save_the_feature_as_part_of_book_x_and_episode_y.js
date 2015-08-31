'use strict';

const saveFeature = require('../../features/save_feature.js');

module.exports = () => {
	this.When(/^I request to save the feature as part of book "([^"]*)" and episode "([^"]*)"$/, (bookIdAlias, episodeIdAlias, done) => {
        const world = this.world;

        saveFeature(world, world[bookIdAlias], world[episodeIdAlias] ,world.newFeature, done);
    });
};
