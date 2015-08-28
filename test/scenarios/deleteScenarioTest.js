'use strict';

const mockery = require('mockery'),
	sinon = require('sinon'),
	q = require('q'),
	should = require('chai').should();

describe('Delete scenario', () => {
	it('Should call the next callback', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const deleteScenario = createDeleteScenarioMiddleware(updateInStorageStub);
		deleteScenario(createRequestStub('id1', 'id2'), createResponseStub(), done);

		deferred.resolve();
	});

	it('Should return a 204 response status code when everything went ok', done => {
		const responseStub = createResponseStub();
		const responseSpy = sinon.spy(responseStub, 'json');

		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const deleteScenario = createDeleteScenarioMiddleware(updateInStorageStub);
		deleteScenario(createRequestStub('id1', 'id2'), responseStub, checkResponse);

		function checkResponse(){
			responseSpy.args[0][0].should.equal(204);
			done();
		}

		deferred.resolve();
	});

	it('Should delete the feature from the db', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const featureId = '1234567';
		const scenarioId = 'qwerty';

		const deleteScenario = createDeleteScenarioMiddleware(updateInStorageStub);
		deleteScenario(createRequestStub(featureId, scenarioId), createResponseStub(), checkResponse);

		function checkResponse(){
			updateInStorageStub.calledOnce.should.equal(true);
			updateInStorageStub.args[0][0].should.deep.equal({id: featureId, 'scenarios.id': scenarioId});
			updateInStorageStub.args[0][1].should.deep.equal({$unset: {'scenarios.$': ''}});
			done();
		}

		deferred.resolve();
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});

function createResponseStub() {
	return {
		json: () => {
		}
	}
}

function createRequestStub(featureId, scenarioId) {
	return {
		context: {
			featureId: featureId,
			scenarioId: scenarioId
		}
	};
}


function createDeleteScenarioMiddleware(updateInStorageStub) {
	mockery.registerMock('../storage/updateInStorage.js', updateInStorageStub);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/scenarios/deleteScenario.js');
}
