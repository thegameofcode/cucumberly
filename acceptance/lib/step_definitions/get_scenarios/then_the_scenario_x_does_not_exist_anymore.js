'use strict';

const getBook = require('../../books/get_book.js');

module.exports = () => {
	this.Then(/^the scenario with id "([^"]*)" from feature "([^"]*)" does not exist anymore$/, (scenarioIdAlias, featureIdAlias, done) => {
		const world = this.world;

		const scenarioId = world[scenarioIdAlias];
		const featureId = world[featureIdAlias];

		getBook(world, () => {
			const responseBody = world.lastResponseBody;
			let foundScenario = false;

			responseBody.items.forEach(feature => {
				if(feature.id === featureId && feature.scenarios !== undefined) {
					feature.scenarios.forEach(scenario => {
						if (scenario.id === scenarioId && !foundScenario) foundScenario = true;
					});
				}
			});

			foundScenario.should.equal(false);

			done();
		});

	});
};
