'use strict';

const sinon = require('sinon'),
	q = require('q'),
	_ = require('lodash'),
	mockery = require('mockery'),
	should = require('chai').should();

describe('Create a book', () => {

	const idsGeneratorStub = () => '123';

	it('Should call the next callback', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		let persistOnStorageStub = sinon.stub();
		persistOnStorageStub.returns(promise);

		const createBook = getCreateBookMiddleware(idsGeneratorStub, persistOnStorageStub);
		createBook(createRequestStub(), createResponseStub(), done);

		deferred.resolve();
	});

	it('Should return 201 created', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		let persistOnStorageStub = sinon.stub();
		persistOnStorageStub.returns(promise);

		const responseStub = createResponseStub();
		const responseSpy = sinon.spy(responseStub, 'json');

		const createBook = getCreateBookMiddleware(idsGeneratorStub, persistOnStorageStub);
		createBook(createRequestStub(), responseStub, checkResponse);

		function checkResponse(){
			responseSpy.args[0][0].should.equal(201);
			done();
		}

		deferred.resolve();
	});

	it('Should return an id property', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		let persistOnStorageStub = sinon.stub();
		persistOnStorageStub.returns(promise);

		const responseStub = createResponseStub();
		const responseSpy = sinon.spy(responseStub, 'json');

		const idsGeneratorStub = sinon.stub();
		idsGeneratorStub.returns('abc123');

		const createBook = getCreateBookMiddleware(idsGeneratorStub, persistOnStorageStub);
		createBook(createRequestStub(), responseStub, checkResponse);

		function checkResponse(){
			const body = responseSpy.args[0][1];
			should.exist(body.id);
			body.id.should.equal('abc123');
			done();
		}

		deferred.resolve();
	});

	it('Should store the book data and id', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		let persistOnStorageStub = sinon.stub();
		persistOnStorageStub.returns(promise);

		const createBook = getCreateBookMiddleware(idsGeneratorStub, persistOnStorageStub);
		const mockedRequest = createRequestStub();
		createBook(mockedRequest, createResponseStub(), checkResponse);

		function checkResponse(){
			persistOnStorageStub.calledOnce.should.equal(true);

			const elementsToPersist = persistOnStorageStub.args[0][0];
			const expectedPersistedElements = _.assign(mockedRequest.body, {id: idsGeneratorStub()});

			elementsToPersist.should.deep.equal(expectedPersistedElements);
			done();
		}

		deferred.resolve();
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});



function getCreateBookMiddleware(idsMock, persistOnStorageStub) {
	mockery.registerMock('../idsGenerator/generateId.js', idsMock);
	mockery.registerMock('../storage/persistOnStorage.js', persistOnStorageStub);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/books/createBook.js');
}

function createResponseStub() {
	return {
		json: () => {}
	}
}

function createRequestStub() {
	return {
		body: {
			name: 'some name'
		}
	};
}
