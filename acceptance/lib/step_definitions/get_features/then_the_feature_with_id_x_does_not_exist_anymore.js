'use strict';

const getFeatures = require('../../features/get_features.js');
require('chai').should();

module.exports = () => {
	this.Then(/^the feature with id "([^"]*)" does not exist anymore$/, (idAlias, done) => {
		const world = this.world;
		const featureId = world[idAlias];

		getFeatures(world, () => {
			const responseBody = world.lastResponseBody;
			let foundFeature = false;
			responseBody.forEach(feature => {
				if (feature.id === featureId && !foundFeature) foundFeature = true;
			});
			foundFeature.should.equal(false);
			done();
		});
	});
};
