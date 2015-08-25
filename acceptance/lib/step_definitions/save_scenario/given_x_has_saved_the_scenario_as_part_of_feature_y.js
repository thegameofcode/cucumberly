'use strict';

const saveScenario = require('../../scenarios/save_scenario.js');

module.exports = () => {
	this.Given(/^\\\$FRONT_END_APP has saved the following new scenario as part of feature "([^"]*)"$/, function (featureAlias, scenarioDataTable, done) {

		saveScenario(this.world, scenarioDataTable.hashes()[0], this.world[featureAlias], done)
	});
};
