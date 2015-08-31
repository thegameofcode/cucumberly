'use strict';

const sinon = require('sinon'),
	q = require('q'),
	mockery = require('mockery'),
	_ = require('lodash'),
	should = require('chai').should();

describe('Create scenario', () => {

	const idsGeneratorStub = () => '123';

	it('Should call the next callback', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		let persistScenarioInStorage = sinon.stub();
		persistScenarioInStorage.returns(promise);

		const createScenario = getCreateScenarioMiddleware(idsGeneratorStub, persistScenarioInStorage, () => {});
		createScenario(mockRequest(), mockResponse(), done);

		deferred.resolve();
	});

	it('Should return 201 created', done => {
		const responseMock = mockResponse();
		const responseSpy = sinon.spy(responseMock, 'json');

		let deferred = q.defer();
		let promise = deferred.promise;

		let persistScenarioInStorage = sinon.stub();
		persistScenarioInStorage.returns(promise);

		const createScenario = getCreateScenarioMiddleware(idsGeneratorStub, persistScenarioInStorage, () => {});
		createScenario(mockRequest(), responseMock, checkResponse);

		deferred.resolve();
		function checkResponse() {
			responseSpy.args[0][0].should.equal(201);
			done();
		}
	});

	it('Should return an id property with the scenario id', done => {
		const responseMock = mockResponse();
		const responseSpy = sinon.spy(responseMock, 'json');

		let deferred = q.defer();
		let promise = deferred.promise;

		let persistScenarioInStorage = sinon.stub();
		persistScenarioInStorage.returns(promise);

		const createScenario = getCreateScenarioMiddleware(idsGeneratorStub, persistScenarioInStorage, () => {});
		createScenario(mockRequest(), responseMock, checkResponse);

		deferred.resolve();

		function checkResponse() {
			const body = responseSpy.args[0][1];
			body.should.deep.equal({id: idsGeneratorStub()});
			done();
		}
	});

	it('Should store the scenario data and id', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		let persistScenarioInStorage = sinon.stub();
		persistScenarioInStorage.returns(promise);

		const featureId = 'abc1234';
		const mockedRequest = mockRequest(featureId);

		const createScenario = getCreateScenarioMiddleware(idsGeneratorStub, persistScenarioInStorage);
		createScenario(mockedRequest, mockResponse(), checkResponse);

		deferred.resolve();

		function checkResponse() {
			persistScenarioInStorage.calledOnce.should.equal(true);

			persistScenarioInStorage.args[0][0].should.equal(featureId);
			persistScenarioInStorage.args[0][1].should.deep.equal(_.assign({id: idsGeneratorStub()}, mockedRequest.body));
			done();
		}
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});


function getCreateScenarioMiddleware(idsMock, persistScenarioInStorage) {
	mockery.registerMock('../idsGenerator/generateId.js', idsMock);
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
