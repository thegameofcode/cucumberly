'use strict';

module.exports = () => {
	this.Given(/^the scenario has the id "([^"]*)"$/, (scenarioAlias, done) => {
		this.world[scenarioAlias] = this.world.lastResponseBody.id;
		done();
	});
};
