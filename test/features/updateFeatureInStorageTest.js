'use strict';

const mockery = require('mockery'),
	sinon = require('sinon'),
	q = require('q'),
	should = require('chai').should();

describe('Update feature in storage', () => {
	it('Should be able to update the feature name', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const updateFeature = createUpdateFeature(updateInStorageStub);

		updateFeature('abc', {name: 'AbC'}).then(() => {
			updateInStorageStub.calledOnce.should.equal(true);

			updateInStorageStub.args[0][0].should.deep.equal({id: 'abc'});
			updateInStorageStub.args[0][1].should.deep.equal({$set: {'name': 'AbC'}});
			done();
		});

		deferred.resolve();
	});

	it('Should be able to update the feature beneficiary', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const updateFeature = createUpdateFeature(updateInStorageStub);

		updateFeature('abc', {beneficiary: 'AbC'}).then(() => {
			updateInStorageStub.calledOnce.should.equal(true);

			updateInStorageStub.args[0][0].should.deep.equal({id: 'abc'});
			updateInStorageStub.args[0][1].should.deep.equal({$set: {'beneficiary': 'AbC'}});
			done();
		});

		deferred.resolve();
	});

	it('Should be able to update the feature motivation', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const updateFeature = createUpdateFeature(updateInStorageStub);

		updateFeature('abc', {motivation: 'AbC'}).then(() => {
			updateInStorageStub.calledOnce.should.equal(true);

			updateInStorageStub.args[0][0].should.deep.equal({id: 'abc'});
			updateInStorageStub.args[0][1].should.deep.equal({$set: {'motivation': 'AbC'}});
			done();
		});

		deferred.resolve();
	});

	it('Should be able to update the feature expectedBehaviour', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const updateFeature = createUpdateFeature(updateInStorageStub);

		updateFeature('abc', {expectedBehaviour: 'AbC'}).then(() => {
			updateInStorageStub.calledOnce.should.equal(true);

			updateInStorageStub.args[0][0].should.deep.equal({id: 'abc'});
			updateInStorageStub.args[0][1].should.deep.equal({$set: {'expectedBehaviour': 'AbC'}});
			done();
		});

		deferred.resolve();
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});


function createUpdateFeature(updateInStorageStub) {
	mockery.registerMock('../storage/updateInStorage.js', updateInStorageStub);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/features/updateFeatureInStorage.js');
}
