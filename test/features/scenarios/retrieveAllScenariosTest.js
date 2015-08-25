'use strict';

const sinon = require('sinon'),
	mockery = require('mockery'),
	should = require('chai').should(),
	q = require('q');

describe('Retrieve all scenarios for a given feature id', () => {
	it('Should call the next function', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const retrieveFromStorageStub = sinon.stub();
		retrieveFromStorageStub.returns(promise);

		const retrieveAllScenarios = createRetrieveAllScenariosMiddleware(retrieveFromStorageStub, () => {});
		retrieveAllScenarios(createRequestStub('abc'), createResponseStub(), done);

		deferred.resolve();
	});

	it('Should return a 200 OK response code', done => {
		const responseStub = createResponseStub();
		const responseSpy = sinon.spy(responseStub, 'json');

		let deferred = q.defer();
		let promise = deferred.promise;

		const retrieveFromStorageStub = sinon.stub();
		retrieveFromStorageStub.returns(promise);

		const retrieveAllScenarios = createRetrieveAllScenariosMiddleware(retrieveFromStorageStub, () => {});
		retrieveAllScenarios(createRequestStub('abc'), responseStub, checkResponse);

		function checkResponse () {
			responseSpy.args[0][0].should.equal(200);
			done();
		}

		deferred.resolve();
	});

	it('Should return the stored scenarios for the given features', done => {
		const responseStub = createResponseStub();
		const responseSpy = sinon.spy(responseStub, 'json');

		const featureId = '123abc';
		const requestStub = createRequestStub(featureId);

		let deferred = q.defer();
		let promise = deferred.promise;

		const retrieveFromStorageStub = sinon.stub();
		retrieveFromStorageStub.withArgs({featureId: featureId}).returns(promise);

		const storageResponse = {a: 1, b: 2};
		const assembleResponseBody = sinon.stub();

		const assembledBody = {c: 3, d: 4};
		assembleResponseBody.withArgs(storageResponse).returns(assembledBody);

		const retrieveAllScenarios = createRetrieveAllScenariosMiddleware(retrieveFromStorageStub, assembleResponseBody);
		retrieveAllScenarios(requestStub, responseStub, checkResponse);


		deferred.resolve(storageResponse);

		function checkResponse () {
			responseSpy.args[0][0].should.equal(200);

			const body = responseSpy.args[0][1];
			should.exist(body);
			body.should.deep.equal(assembledBody);
			done();
		}
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});

function createResponseStub() {
	return { json: () => {} }
}

function createRequestStub(featureId) {
	return {
		context: {
			featureId: featureId
		}
	};
}

function createRetrieveAllScenariosMiddleware(retrieveFromStorageStub, assembleResponseBody) {
	mockery.registerMock('./../../storage/retrieveFromStorage.js', retrieveFromStorageStub);
	mockery.registerMock('./assembleResponseBody.js', assembleResponseBody);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../../src/features/scenarios/retrieveAllScenarios.js');
}
