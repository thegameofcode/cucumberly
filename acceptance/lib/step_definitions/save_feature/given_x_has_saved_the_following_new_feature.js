'use strict';

const saveFeature = require('../../features/save_feature.js');

module.exports = () => {
    this.Given(/^\$FRONT_END_APP has saved the following new feature$/, (featureDataTable, done) => {
        saveFeature(this.world, featureDataTable.hashes()[0], done);
    });
};
