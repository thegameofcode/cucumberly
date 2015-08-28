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
		retrieveBook(null, createResponseStub(), done);

		deferred.resolve();
	});

	it('Should return a 200 OK response code', done => {
		const responseStub = createResponseStub();
		const responseSpy = sinon.spy(responseStub, 'json');

		let deferred = q.defer();
		let promise = deferred.promise;

		const retrieveFromStorageStub = sinon.stub();
		retrieveFromStorageStub.returns(promise);

		const retrieveBook = createRetrieveBook(retrieveFromStorageStub);
		retrieveBook(null, responseStub, checkResponse);

		function checkResponse () {
			responseSpy.args[0][0].should.equal(200);
			done();
		}

		deferred.resolve();
	});

	it('Should return the stored features', done => {
		const responseStub = createResponseStub();
		const responseSpy = sinon.spy(responseStub, 'json');

		let deferred = q.defer();
		let promise = deferred.promise;

		const storageResponse = {a: 1, b: 2};
		const retrieveFromStorageStub = sinon.stub();
		retrieveFromStorageStub.returns(promise);

		const retrieveBook = createRetrieveBook(retrieveFromStorageStub);
		retrieveBook(null, responseStub, checkResponse);

		deferred.resolve(storageResponse);

		function checkResponse () {
			responseSpy.args[0][0].should.equal(200);

			const body = responseSpy.args[0][1];
			should.exist(body.items);
			body.items.should.deep.equal(storageResponse);
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

function createRetrieveBook(retrieveFromStorageStub) {
	mockery.registerMock('./../storage/retrieveFromStorage.js', retrieveFromStorageStub);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/books/retrieveBook.js');
}