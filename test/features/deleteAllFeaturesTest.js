'use strict';

const mockery = require('mockery'),
	sinon = require('sinon'),
	q = require('q'),
	should = require('chai').should();

describe('Delete all features', () => {
	it('Should call the next callback', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const deleteFromStorageStub = sinon.stub();
		deleteFromStorageStub.returns(promise);

		const deleteAllFeatures = createDeleteAllFeatureMiddleware(deleteFromStorageStub);
		deleteAllFeatures(null, createResponseStub(), done);

		deferred.resolve();
	});

	it('Should return a 204 response status code when everything went ok', done => {
		const responseStub = createResponseStub();
		const responseSpy = sinon.spy(responseStub, 'json');

		let deferred = q.defer();
		let promise = deferred.promise;

		const deleteFromStorageStub = sinon.stub();
		deleteFromStorageStub.returns(promise);

		const deleteAllFeatures = createDeleteAllFeatureMiddleware(deleteFromStorageStub);
		deleteAllFeatures(null, responseStub, checkResponse);

		function checkResponse () {
			responseSpy.args[0][0].should.equal(204);
			done();
		}

		deferred.resolve();
	});
	it('Should delete the features from the db', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const deleteFromStorageStub = sinon.stub();
		deleteFromStorageStub.returns(promise);

		const deleteAllFeatures = createDeleteAllFeatureMiddleware(deleteFromStorageStub);
		deleteAllFeatures(null, createResponseStub(), checkResponse);

		function checkResponse () {
			deleteFromStorageStub.calledOnce.should.equal(true);
			deleteFromStorageStub.args[0][0].should.deep.equal({});
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
		json: () => {}
	}
}

function createDeleteAllFeatureMiddleware(deleteFromStorageStub) {
	mockery.registerMock('../storage/deleteFromStorage.js', deleteFromStorageStub);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/features/deleteAllFeatures.js');
}
