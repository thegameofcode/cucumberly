'use strict';

const deleteAllFeature = require('../../features/delete_features.js');

module.exports = () => {
	this.When(/^I ask cucumberly to delete all feature with$/, done => {
		deleteAllFeature(this.world, done);
	});
};
