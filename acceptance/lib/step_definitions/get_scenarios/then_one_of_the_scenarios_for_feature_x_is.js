'use strict';

const _ = require('lodash');

module.exports = () => {
	this.Then(/^one of the scenarios for feature "([^"]*)" is$/, (featureIdAlias, scenarioDataTable, done) => {
		const expectedScenarioDataTableParsed = scenarioDataTable.hashes()[0];
		const expectedScenarioData = {
			name: expectedScenarioDataTableParsed.name,
			description: expectedScenarioDataTableParsed.description,
			steps: {
				given: JSON.parse(expectedScenarioDataTableParsed.given),
				when: JSON.parse(expectedScenarioDataTableParsed.when),
				then: JSON.parse(expectedScenarioDataTableParsed.then)
			}
		};

		const world = this.world;
		const responseBody = world.lastResponseBody;

		const featureId = world[featureIdAlias];
		
		let foundScenario = false;
		responseBody.items.forEach(feature => {
			if(feature.id === featureId && feature.scenarios !== undefined) {
				feature.scenarios.forEach(scenario => {
					delete scenario.id
					if (_.isEqual(expectedScenarioData, scenario) && !foundScenario) foundScenario = true;
				});
			}
		});

		foundScenario.should.equal(true);
		done();
	});
};
