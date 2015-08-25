'use strict';

const sinon = require('sinon'),
	q = require('q'),
	_ = require('lodash'),
	mockery = require('mockery'),
	should = require('chai').should();

describe('Create scenario', () => {

	const idsGeneratorStub = () => 'abc123';

	it('Should call the next callback', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		let persistOnStorageStub = sinon.stub();
		persistOnStorageStub.returns(promise);

		const createScenario = getCreateScenarioMiddleware(idsGeneratorStub, persistOnStorageStub);
		createScenario(mockRequest(), mockResponse(), done);

		deferred.resolve();
	});

	it('Should return 201 created', done => {
		const responseMock = mockResponse();
		const responseSpy = sinon.spy(responseMock, 'json');

		let deferred = q.defer();
		let promise = deferred.promise;

		let persistOnStorageStub = sinon.stub();
		persistOnStorageStub.returns(promise);

		const createScenario = getCreateScenarioMiddleware(idsGeneratorStub, persistOnStorageStub);
		createScenario(mockRequest(), responseMock, checkResponse);

		deferred.resolve();
		function checkResponse() {
			responseSpy.args[0][0].should.equal(201);
			done();
		}
	});

	it('Should return an id property', done => {
		const responseMock = mockResponse();
		const responseSpy = sinon.spy(responseMock, 'json');

		let deferred = q.defer();
		let promise = deferred.promise;

		let persistOnStorageStub = sinon.stub();
		persistOnStorageStub.returns(promise);

		const createScenario = getCreateScenarioMiddleware(idsGeneratorStub, persistOnStorageStub);
		createScenario(mockRequest(), responseMock, checkResponse);

		deferred.resolve();

		function checkResponse() {
			const body = responseSpy.args[0][1];
			should.exist(body.id);
			body.id.should.equal(idsGeneratorStub());
			done();
		}
	});

	it('Should store the scenario data, id and the feature id as well', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		let persistOnStorageStub = sinon.stub();
		persistOnStorageStub.returns(promise);

		const featureId = 'abc1234';
		const mockedRequest = mockRequest(featureId);

		const createScenario = getCreateScenarioMiddleware(idsGeneratorStub, persistOnStorageStub);
		createScenario(mockedRequest, mockResponse(), checkResponse);

		deferred.resolve();

		function checkResponse() {
			persistOnStorageStub.calledOnce.should.equal(true);

			const elementsToPersist = persistOnStorageStub.args[0][0];
			const expectedPersistedElements = _.assign(
				mockedRequest.body,
				{
					id: idsGeneratorStub(),
					featureId: featureId
				});

			elementsToPersist.should.deep.equal(expectedPersistedElements);
			done();
		}
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});


function getCreateScenarioMiddleware(idsMock, persistOnStorageStub) {
	mockery.registerMock('../../idsGenerator/generateId.js', idsMock);
	mockery.registerMock('../../storage/persistOnStorage.js', persistOnStorageStub);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../../src/features/scenarios/createScenario.js');
}


function mockResponse() {
	return {
		json: () => {}
	}
}

function mockRequest(featureId) {
	return {
		context: {
			featureId: featureId
		},
		body: {
			a: 1,
			b: 2
		}
	};
}
