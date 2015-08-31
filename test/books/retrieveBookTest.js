'use strict';

const sinon = require('sinon'),
	mockery = require('mockery'),
	should = require('chai').should(),
	q = require('q');


describe('Retrieve book', () => {
	it('Should call the next function', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const retrieveFromStorageStub = sinon.stub();
		retrieveFromStorageStub.returns(promise);

		const retrieveBook = createRetrieveBook(retrieveFromStorageStub);
		retrieveBook(createRequestStub(123), createResponseStub(), done);

		deferred.resolve([{name: 'hi', id: 1, _id: 2}]);
	});

	it('Should return a 200 OK response code', done => {
		const responseStub = createResponseStub();
		const responseSpy = sinon.spy(responseStub, 'json');

		let deferred = q.defer();
		let promise = deferred.promise;

		const retrieveFromStorageStub = sinon.stub();
		retrieveFromStorageStub.returns(promise);

		const retrieveBook = createRetrieveBook(retrieveFromStorageStub);
		retrieveBook(createRequestStub('123'), responseStub, checkResponse);

		function checkResponse () {
			responseSpy.args[0][0].should.equal(200);
			done();
		}

		deferred.resolve([{name: 'hi', id: 1, _id: 2}]);
	});

	it('Should return the stored data for this book', done => {
		const responseStub = createResponseStub();
		const responseSpy = sinon.spy(responseStub, 'json');

		const bookId = 'abc1234';
		const requestStub = createRequestStub(bookId);

		let deferred = q.defer();
		let promise = deferred.promise;

		const storageResponse = [{name: 'hi', id: 1, _id: 2}];
		const retrieveFromStorageStub = sinon.stub();
		retrieveFromStorageStub.withArgs({id: bookId}).returns(promise);

		const retrieveBook = createRetrieveBook(retrieveFromStorageStub);
		retrieveBook(requestStub, responseStub, checkResponse);

		deferred.resolve(storageResponse);

		function checkResponse() {
			responseSpy.args[0][0].should.equal(200);

			const body = responseSpy.args[0][1];
			body.should.deep.equal({name: 'hi'});
			should.not.exist(body.id);
			should.not.exist(body._id);
			done();
		}
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});


function createResponseStub() {
	return { json: () => {} };
}

function createRequestStub(bookId) {
	return {context: {bookId: bookId}};
}

function createRetrieveBook(retrieveFromStorageStub) {
	mockery.registerMock('./../storage/retrieveFromStorage.js', retrieveFromStorageStub);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/books/retrieveBook.js');
}
