'use strict';

const _ = require('lodash');

module.exports = scenarios => {

	let items = [];
	scenarios.forEach(scenario => items.push(assembleScenario(scenario)));
	return {
		items: items
	}
};

function assembleScenario(scenario) {
	return {
		name: scenario.name,
		description: scenario.description,
		steps: {
			given: scenario.stepsGiven,
			when: scenario.stepsWhen,
			then: scenario.stepsThen
		}
	}
}
