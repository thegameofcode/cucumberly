'use strict';

const _ = require('lodash');

module.exports = () => {
	this.Then(/^one of the scenarios is$/, function (scenarioDataTable, done) {
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

		const obtainedScenarios = this.world.lastResponseBody.items;

		let foundScenario = false;
		obtainedScenarios.forEach(scenario => {
			if (_.isEqual(expectedScenarioData, scenario) && !foundScenario) foundScenario = true;
		});

		foundScenario.should.equal(true);
		done();
	});
};
