'use strict';

module.exports = () => {
    this.Given(/^\$FRONT_END_APP has created the following new feature$/, (featureDataTable, done) => {

        this.world.newFeature = featureDataTable.hashes()[0];
        done();
    });
};
