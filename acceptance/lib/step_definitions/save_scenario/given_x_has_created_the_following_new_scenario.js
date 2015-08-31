'use strict';

module.exports = () => {
	this.Given(/^\\\$FRONT_END_APP has created the following new scenario$/, (scenarioDataTable, done) => {
		this.world.newScenario = scenarioDataTable.hashes()[0];
		done();
	});
};
