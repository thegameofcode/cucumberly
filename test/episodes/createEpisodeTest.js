'use strict';

const sinon = require('sinon'),
	q = require('q'),
	mockery = require('mockery'),
	_ = require('lodash'),
	should = require('chai').should();

describe('Create episode', () => {

	const idsGeneratorStub = () => '123';

	it('Should call the next callback', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		let persistEpisodeInStorage = sinon.stub();
		persistEpisodeInStorage.returns(promise);

		const createEpisode = getCreateEpisodeMiddleware(idsGeneratorStub, persistEpisodeInStorage);
		createEpisode(mockRequest('book-id-123'), mockResponse(), done);

		deferred.resolve();
	});

	it('Should return 201 created', done => {
		const responseMock = mockResponse();
		const responseSpy = sinon.spy(responseMock, 'json');

		let deferred = q.defer();
		let promise = deferred.promise;

		let persistEpisodeInStorage = sinon.stub();
		persistEpisodeInStorage.returns(promise);

		const createEpisode = getCreateEpisodeMiddleware(idsGeneratorStub, persistEpisodeInStorage);
		createEpisode(mockRequest('book-id-123'), responseMock, checkResponse);

		function checkResponse() {
			responseSpy.args[0][0].should.equal(201);
			done();
		}

		deferred.resolve();
	});

	it('Should return an id property with the scenario id', done => {
		const responseMock = mockResponse();
		const responseSpy = sinon.spy(responseMock, 'json');

		let deferred = q.defer();
		let promise = deferred.promise;

		let persistEpisodeInStorage = sinon.stub();
		persistEpisodeInStorage.returns(promise);

		const createEpisode = getCreateEpisodeMiddleware(idsGeneratorStub, persistEpisodeInStorage);
		createEpisode(mockRequest('book-id-123'), responseMock, checkResponse);

		function checkResponse() {
			const body = responseSpy.args[0][1];
			body.should.deep.equal({id: idsGeneratorStub()});
			done();
		}

		deferred.resolve();
	});

	it('Should store the scenario data and id', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		let persistEpisodeInStorage = sinon.stub();
		persistEpisodeInStorage.returns(promise);

		const bookId = 'abc1234';
		const mockedRequest = mockRequest(bookId);

		const createEpisode = getCreateEpisodeMiddleware(idsGeneratorStub, persistEpisodeInStorage);
		createEpisode(mockedRequest, mockResponse(), checkResponse);

		deferred.resolve();

		function checkResponse() {
			persistEpisodeInStorage.calledOnce.should.equal(true);

			persistEpisodeInStorage.args[0][0].should.equal(bookId);
			persistEpisodeInStorage.args[0][1].should.deep.equal(_.assign({id: idsGeneratorStub()}, mockedRequest.body));
			done();
		}
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});

});

function getCreateEpisodeMiddleware(idsMock, persistEpisodeInStorage) {
	mockery.registerMock('../idsGenerator/generateId.js', idsMock);
	mockery.registerMock('./persistEpisodeInStorage.js', persistEpisodeInStorage);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/episodes/createEpisode.js');
}


function mockResponse() {
	return { json: () => {} };
}

function mockRequest(bookId) {
	return {
		context: {
			bookId: bookId
		},
		body: {
			a: 1,
			b: 2
		}
	};
}
