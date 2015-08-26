'use strict';

const getScenarios = require('../../scenarios/get_scenarios.js');

module.exports = () => {
	this.When(/^I ask cucumberly to give me my scenarios of feature "([^"]*)"$/, function (featureAlias, done) {
		const world = this.world;

		getScenarios(world, world[featureAlias], done);
	});
};
