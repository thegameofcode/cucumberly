'use strict';

const assembleResponseBody = require('../../../src/features/scenarios/assembleResponseBody.js'),
	should = require('chai').should();

describe('Assemble response body', () => {
	it('Should include scenarios names', () => {
		const scenarios = [{
			name: 'a'
		}];
		const assembledBody = assembleResponseBody(scenarios);

		should.exist(assembledBody.items);
		assembledBody.items.length.should.equal(1);
		assembledBody.items[0].name.should.equal('a');
	});

	it('Should include scenarios descriptions', () => {
		const scenarios = [{
			description: 'a'
		}];
		const assembledBody = assembleResponseBody(scenarios);

		should.exist(assembledBody.items);
		assembledBody.items.length.should.equal(1);
		assembledBody.items[0].description.should.equal('a');
	});

	it('Should include the scenarios given steps', () => {
		const scenarios = [{
			stepsGiven: [1, 2, 3]
		}];
		const assembledBody = assembleResponseBody(scenarios);

		should.exist(assembledBody.items);
		assembledBody.items.length.should.equal(1);
		assembledBody.items[0].steps.given.should.deep.equal([1, 2, 3]);
	});

	it('Should include the scenarios when steps', () => {
		const scenarios = [{
			stepsWhen: [1, 2, 3]
		}];
		const assembledBody = assembleResponseBody(scenarios);

		should.exist(assembledBody.items);
		assembledBody.items.length.should.equal(1);
		assembledBody.items[0].steps.when.should.deep.equal([1, 2, 3]);
	});


	it('Should include the scenarios when steps', () => {
		const scenarios = [{
			stepsThen: [1, 2, 3]
		}];
		const assembledBody = assembleResponseBody(scenarios);

		should.exist(assembledBody.items);
		assembledBody.items.length.should.equal(1);
		assembledBody.items[0].steps.then.should.deep.equal([1, 2, 3]);
	});
});
