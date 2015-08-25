'use strict';

const assembleScenarioToPersist = require('../../../src/features/scenarios/assembleScenarioToPersist.js'),
	_ = require('lodash'),
	should = require('chai').should();

describe('Assemble scenario to persist', () => {

	const defaultBody = {steps: {given: [], when: [1, 2, 3], then: [3, 2, 1]}};

	it('Should include the featureId', () => {
		const assembledScenario = assembleScenarioToPersist('', createRequestStub('111111', defaultBody));

		should.exist(assembledScenario.featureId);
		assembledScenario.featureId.should.equal('111111');
	});

	it('Should include the scenario id as id', () => {
		const assembledScenario = assembleScenarioToPersist('222222', createRequestStub('feat1', defaultBody));

		should.exist(assembledScenario.id);
		assembledScenario.id.should.equal('222222');
	});

	it('Should include the scenario name', () => {
		const requestStub = createRequestStub('someId', _.assign({name: 'scenario name'}, defaultBody));

		const assembledScenario = assembleScenarioToPersist('123', requestStub);

		should.exist(assembledScenario.name);
		assembledScenario.name.should.equal('scenario name');
	});

	it('Should include the scenario description', () => {
		const requestStub = createRequestStub('someId', _.assign({description: 'scenario description'}, defaultBody));

		const assembledScenario = assembleScenarioToPersist('123', requestStub);

		should.exist(assembledScenario.description);
		assembledScenario.description.should.equal('scenario description');
	});

	it('Should include the given steps', () => {
		const requestStub = createRequestStub('someId', {steps: {given: [1, 2, 3]}});

		const assembledScenario = assembleScenarioToPersist('123', requestStub);

		should.exist(assembledScenario.stepsGiven);
		assembledScenario.stepsGiven.should.deep.equal([1, 2, 3]);
	});

	it('Should include the when steps', () => {
		const requestStub = createRequestStub('someId', {steps: {when: [1, 2, 3]}});

		const assembledScenario = assembleScenarioToPersist('123', requestStub);

		should.exist(assembledScenario.stepsWhen);
		assembledScenario.stepsWhen.should.deep.equal([1, 2, 3]);
	});

	it('Should include the then steps', () => {
		const requestStub = createRequestStub('someId', {steps: {then: [1, 2, 3]}});

		const assembledScenario = assembleScenarioToPersist('123', requestStub);

		should.exist(assembledScenario.stepsThen);
		assembledScenario.stepsThen.should.deep.equal([1, 2, 3]);
	});
});

function createRequestStub(featureId, inputBody) {
	return {
		context: {
			featureId: featureId
		},
		body: inputBody
	};
}
