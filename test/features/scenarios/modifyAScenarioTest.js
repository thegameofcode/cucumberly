'use strict';

const mockery = require('mockery'),
	sinon = require('sinon'),
	q = require('q'),
	should = require('chai').should();

describe('Modify a scenario', () => {
	it('Should call the next function', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const modifyScenario = createModifyScenarioMiddleware(updateInStorageStub, () => {});
		modifyScenario(createRequestStub('123'), createResponseStub(), done);

		deferred.resolve();
	});

	it('Should update the data of an existing scenario', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const featureId = 'abc123';
		const scenarioId = 'scen123';
		const dataToUpdate = {some: 'thing'};

		const requestStub = createRequestStub(featureId, scenarioId, dataToUpdate);

		const assembledDataToUpdateStub = sinon.stub();
		assembledDataToUpdateStub.withArgs(scenarioId, requestStub).returns({transformed: 'data'});


		const modifyScenario = createModifyScenarioMiddleware(updateInStorageStub, assembledDataToUpdateStub);
		modifyScenario(requestStub, createResponseStub(), checkResponse);

		deferred.resolve();

		function checkResponse () {
			updateInStorageStub.calledOnce.should.equal(true);
			updateInStorageStub.args[0][0].should.deep.equal(scenarioId);
			updateInStorageStub.args[0][1].should.deep.equal({transformed: 'data'});
			done();
		}
	});

	it('Should return a 200 response status code when everything went ok', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const requestStub = createRequestStub('123', '432', {some: 'data'});
		const responseStub = createResponseStub();
		const responseSpy = sinon.spy(responseStub, 'json');

		const modifyScenario = createModifyScenarioMiddleware(updateInStorageStub, () => {});
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


function createModifyScenarioMiddleware(updateInStorageStub, assembledDataToUpdateStub) {
	mockery.registerMock('./../../storage/updateInStorage.js', updateInStorageStub);
	mockery.registerMock('./assembleScenarioToPersist', assembledDataToUpdateStub);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../../src/features/scenarios/modifyAScenario.js');
}
