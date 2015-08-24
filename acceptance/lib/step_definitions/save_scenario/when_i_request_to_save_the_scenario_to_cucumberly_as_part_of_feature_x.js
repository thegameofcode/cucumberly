'use strict';

const saveScenario = require('../../scenarios/save_scenario.js');

module.exports = () => {
	this.When(/^I request to save the scenario to cucumberly as part of feature "([^"]*)"$/, function (featureAlias, done) {

		saveScenario(this.world, this.world.newScenario, this.world[featureAlias], done);
	});
};
