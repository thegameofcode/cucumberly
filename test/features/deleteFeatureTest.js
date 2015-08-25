'use strict';

const mockery = require('mockery'),
	sinon = require('sinon'),
	q = require('q'),
	should = require('chai').should();

describe('Delete a feature', () => {
	it('Should call the next callback', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const deleteFromStorageStub = sinon.stub();
		deleteFromStorageStub.returns(promise);

		const deleteFeature = createDeleteFeatureMiddleware(deleteFromStorageStub);
		deleteFeature(createRequestStub('123'), createResponseStub(), done);

		deferred.resolve();
	});

	it('Should return a 204 response status code when everything went ok', done => {
		const responseStub = createResponseStub();
		const responseSpy = sinon.spy(responseStub, 'json');

		let deferred = q.defer();
		let promise = deferred.promise;

		const deleteFromStorageStub = sinon.stub();
		deleteFromStorageStub.returns(promise);

		const deleteFeature = createDeleteFeatureMiddleware(deleteFromStorageStub);
		deleteFeature(createRequestStub('123'), responseStub, checkResponse);

		function checkResponse() {
			responseSpy.args[0][0].should.equal(204);
			done();
		}

		deferred.resolve();
	});

	it('Should delete the feature from the db', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const deleteFromStorageStub = sinon.stub();
		deleteFromStorageStub.returns(promise);

		const featureId = 'abc123';

		const deleteFeature = createDeleteFeatureMiddleware(deleteFromStorageStub);
		deleteFeature(createRequestStub(featureId), createResponseStub(), checkResponse);

		deferred.resolve();
		function checkResponse () {
			deleteFromStorageStub.calledOnce.should.equal(true);
			deleteFromStorageStub.args[0][0].should.deep.equal({id: featureId});
			done();
		}
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

function createRequestStub(id) {
	return {
		context: {
			featureId: id
		}
	};
}

function createDeleteFeatureMiddleware(deleteFromStorageStub) {
	mockery.registerMock('../storage/deleteFromStorage.js', deleteFromStorageStub);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/features/deleteFeature.js');
}
