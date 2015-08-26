'use strict';

const getScenarios = require('../../scenarios/get_scenarios.js');

module.exports = () => {
	this.Then(/^the scenario with id "([^"]*)" from feature "([^"]*)" does not exist anymore$/, (scenarioIdAlias, featureIdAlias, done) => {
		const world = this.world;

		const scenarioId = world[scenarioIdAlias];
		const featureId = world[featureIdAlias];

		getScenarios(world, featureId, () => {
			const responseBody = world.lastResponseBody;
			let foundScenario = false;
			responseBody.items.forEach(scenario => {
				if (scenario.id === scenarioId && !foundScenario) foundScenario = true;
			});
			foundScenario.should.equal(false);

			done();
		});

	});
};
