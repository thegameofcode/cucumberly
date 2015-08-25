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
		obtainedScenarios.forEach(obtainedFeature => {
			delete obtainedFeature['_id'];
			delete obtainedFeature['id'];
			delete obtainedFeature['featureId'];
			
			if (_.isEqual(expectedScenarioData, obtainedFeature) && !foundScenario) foundScenario = true;
		});

		foundScenario.should.equal(true);
		done();
	});
};
