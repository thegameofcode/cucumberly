'use strict';

const mockery = require('mockery'),
	sinon = require('sinon'),
	q = require('q'),
	should = require('chai').should();

describe('Modify feature', () => {
	it('Should call the next function', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const modifyFeatureMiddleware = createModifyFeatureMiddleware(updateInStorageStub);
		modifyFeatureMiddleware(createRequestStub('123'), createResponseStub(), done);

		deferred.resolve();
	});

	it('Should update the data of an existing feature', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const featureId = 'abc123';
		const dataToUpdate = {some: 'thing'};
		const requestStub = createRequestStub(featureId, dataToUpdate);

		const modifyFeatureMiddleware = createModifyFeatureMiddleware(updateInStorageStub);
		modifyFeatureMiddleware(requestStub, createResponseStub(), checkResponse);

		deferred.resolve();

		function checkResponse () {
			updateInStorageStub.calledOnce.should.equal(true);
			updateInStorageStub.args[0][0].should.equal(featureId);
			updateInStorageStub.args[0][1].should.deep.equal(dataToUpdate);
			done();
		}
	});

	it('Should return a 200 response status code when everything went ok', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const requestStub = createRequestStub('123', {some: 'data'});
		const responseStub = createResponseStub();
		const responseSpy = sinon.spy(responseStub, 'json');

		const modifyFeatureMiddleware = createModifyFeatureMiddleware(updateInStorageStub);
		modifyFeatureMiddleware(requestStub, responseStub, checkResponse);

		deferred.resolve();

		function checkResponse() {
			responseSpy.args[0][0].should.equal(200);
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

function createRequestStub(id, bodyContent) {
	return {
		context: {
			featureId: id
		},
		body: bodyContent
	};
}

function createModifyFeatureMiddleware(updateInStorageStub) {
	mockery.registerMock('../storage/updateInStorage.js', updateInStorageStub);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/features/modifyFeature.js');
}
