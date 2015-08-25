'use strict';

module.exports = (scenarioId, request) => {
	return {
		id: scenarioId,
		featureId: request.context.featureId,
		name: request.body.name,
		description: request.body.description,
		stepsGiven: request.body.steps.given,
		stepsWhen: request.body.steps.when,
		stepsThen: request.body.steps.then
	}
};
