'use strict';

const _ = require('lodash');
require('chai').should();

module.exports = () => {
    this.Then(/^one of the features is$/, (expectedFeatureDataTable, done) => {
        const expectedFeatureDataTableParsed = expectedFeatureDataTable.hashes()[0];
        const expectedFeatureData = {
            name: expectedFeatureDataTableParsed.name,
            description: {
                beneficiary: expectedFeatureDataTableParsed.beneficiary,
                motivation: expectedFeatureDataTableParsed.motivation,
                expectedBehaviour: expectedFeatureDataTableParsed['expected behaviour']
            }
        };

        const obtainedBody = this.world.lastResponseBody;

        let foundFeature = false;
        obtainedBody.forEach(obtainedFeature => {
            delete obtainedFeature['_id'];

            if (_.isEqual(expectedFeatureData, obtainedFeature)) foundFeature = true;
        });

        foundFeature.should.equal(true);
        done();
    });
};
