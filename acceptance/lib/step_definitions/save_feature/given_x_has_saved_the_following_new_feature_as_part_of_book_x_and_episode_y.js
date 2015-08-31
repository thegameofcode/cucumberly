'use strict';

const saveFeature = require('../../features/save_feature.js');

module.exports = () => {
    this.Given(/^\$FRONT_END_APP has saved the following new feature as part of book "([^"]*)" and episode "([^"]*)"$/, (bookIdAlias, episodeIdAlias, featureDataTable, done) => {
        const world = this.world;
        saveFeature(world, world[bookIdAlias], world[episodeIdAlias], featureDataTable.hashes()[0], done);
    });
};
