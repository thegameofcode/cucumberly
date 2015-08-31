'use strict';

const _ = require('lodash');
require('chai').should();

module.exports = () => {
	this.Then(/^one of the features for episode "([^"]*)" is$/, function (episodeIdAlias, expectedFeatureDataTable, done) {
		const expectedFeatureDataTableParsed = expectedFeatureDataTable.hashes()[0];
        const expectedFeatureData = {
            name: expectedFeatureDataTableParsed.name,
            description: {
                beneficiary: expectedFeatureDataTableParsed.beneficiary,
                motivation: expectedFeatureDataTableParsed.motivation,
                expectedBehaviour: expectedFeatureDataTableParsed['expected behaviour']
            }
        };

		const world = this.world;
        const obtainedBody = world.lastResponseBody;
		
        let foundFeature = false;

        obtainedBody.episodes.forEach(episode => {
			if(episode.id === world[episodeIdAlias]) {
				episode.features.forEach(feature => {

					delete feature.id;
					if(_.isEqual(feature, expectedFeatureData)) foundFeature = true;
				});
			}
        });

        foundFeature.should.equal(true);
        done();
    });
};
