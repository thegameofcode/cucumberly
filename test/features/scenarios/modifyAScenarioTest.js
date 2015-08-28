'use strict';

const mockery = require('mockery'),
	sinon = require('sinon'),
	q = require('q'),
	should = require('chai').should();

describe('Modify a scenario', () => {
	it('Should call the next function', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateScenarioInStorageStub = sinon.stub();
		updateScenarioInStorageStub.returns(promise);

		const modifyScenario = createModifyScenarioMiddleware(updateScenarioInStorageStub, () => {});
		modifyScenario(createRequestStub('123'), createResponseStub(), done);

		deferred.resolve();
	});

	it('Should update the data of an existing scenario', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateScenarioInStorageStub = sinon.stub();
		updateScenarioInStorageStub.returns(promise);

		const featureId = 'abc123';
		const scenarioId = 0;
		const dataToUpdate = {some: 'thing'};

		const requestStub = createRequestStub(featureId, scenarioId, dataToUpdate);

		const modifyScenario = createModifyScenarioMiddleware(updateScenarioInStorageStub);
		modifyScenario(requestStub, createResponseStub(), checkResponse);

		deferred.resolve();

		function checkResponse () {
			updateScenarioInStorageStub.calledOnce.should.equal(true);

			updateScenarioInStorageStub.args[0][0].should.equal(featureId);
			updateScenarioInStorageStub.args[0][1].should.equal(scenarioId);
			updateScenarioInStorageStub.args[0][2].should.deep.equal(dataToUpdate);
			done();
		}
	});

	it('Should return a 200 response status code when everything went ok', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateScenarioInStorageStub = sinon.stub();
		updateScenarioInStorageStub.returns(promise);

		const requestStub = createRequestStub('123', '432', {some: 'data'});
		const responseStub = createResponseStub();
		const responseSpy = sinon.spy(responseStub, 'json');

		const modifyScenario = createModifyScenarioMiddleware(updateScenarioInStorageStub, () => {});
		modifyScenario(requestStub, responseStub, checkResponse);

		deferred.resolve();

		function checkResponse() {
			responseSpy.args[0][0].should.equal(200);
			done();
		}
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});


function createResponseStub() {
	return {
		json: () => {}
	}
}

function createRequestStub(featureId, scenarioId, bodyContent) {
	return {
		context: {
			featureId: featureId,
			scenarioId: scenarioId
		},
		body: bodyContent
	};
}


function createModifyScenarioMiddleware(updateInStorageStub) {
	mockery.registerMock('./updateScenarioInStorage.js', updateInStorageStub);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../../src/features/scenarios/modifyAScenario.js');
}
