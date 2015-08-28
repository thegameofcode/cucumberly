'use strict';

const sinon = require('sinon'),
	q = require('q'),
	mockery = require('mockery'),
	should = require('chai').should();

describe('Create scenario', () => {

	it('Should call the next callback', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		let persistScenarioInStorage = sinon.stub();
		persistScenarioInStorage.returns(promise);

		const createScenario = getCreateScenarioMiddleware(persistScenarioInStorage, () => {});
		createScenario(mockRequest(), mockResponse(), done);

		deferred.resolve(6);
	});

	it('Should return 201 created', done => {
		const responseMock = mockResponse();
		const responseSpy = sinon.spy(responseMock, 'json');

		let deferred = q.defer();
		let promise = deferred.promise;

		let persistScenarioInStorage = sinon.stub();
		persistScenarioInStorage.returns(promise);

		const createScenario = getCreateScenarioMiddleware(persistScenarioInStorage, () => {});
		createScenario(mockRequest(), responseMock, checkResponse);

		deferred.resolve(1);
		function checkResponse() {
			responseSpy.args[0][0].should.equal(201);
			done();
		}
	});

	it('Should return an id property of a fixed value 0 for now', done => {
		const responseMock = mockResponse();
		const responseSpy = sinon.spy(responseMock, 'json');

		let deferred = q.defer();
		let promise = deferred.promise;

		let persistScenarioInStorage = sinon.stub();
		persistScenarioInStorage.returns(promise);

		const createScenario = getCreateScenarioMiddleware(persistScenarioInStorage, () => {});
		createScenario(mockRequest(), responseMock, checkResponse);

		deferred.resolve(3);

		function checkResponse() {
			const body = responseSpy.args[0][1];
			body.should.deep.equal({id: 0});
			done();
		}
	});

	it('Should store the scenario data, id and the feature id as well', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		let persistScenarioInStorage = sinon.stub();
		persistScenarioInStorage.returns(promise);

		const featureId = 'abc1234';
		const mockedRequest = mockRequest(featureId);

		const createScenario = getCreateScenarioMiddleware(persistScenarioInStorage);
		createScenario(mockedRequest, mockResponse(), checkResponse);

		deferred.resolve(2);

		function checkResponse() {
			persistScenarioInStorage.calledOnce.should.equal(true);

			persistScenarioInStorage.args[0][0].should.equal(featureId);
			persistScenarioInStorage.args[0][1].should.equal(mockedRequest.body);
			done();
		}
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});


function getCreateScenarioMiddleware(persistScenarioInStorage) {
	mockery.registerMock('./persistScenarioInStorage.js', persistScenarioInStorage);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/scenarios/createScenario.js');
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
