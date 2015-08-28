'use strict';

const sinon = require('sinon'),
	q = require('q'),
	mockery = require('mockery'),
	should = require('chai').should();

describe('Persist scenario in storage', () => {

	it('Should persist new scenarios as part of features', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		let updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const persistScenarioInStorage = createPersistScenarioInStorage(updateInStorageStub);

		const scenarioBody = {
			name: 'some name',
			steps: 1
		};
		persistScenarioInStorage('abc123', scenarioBody).then(() => {
			updateInStorageStub.calledOnce.should.equal(true);

			updateInStorageStub.args[0][0].should.deep.equal({id: 'abc123'});
			updateInStorageStub.args[0][1].should.deep.equal({$push: {'scenarios': scenarioBody}});
			done();
		});

		deferred.resolve();
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});



function createPersistScenarioInStorage(updateInStorage) {
	mockery.registerMock('../storage/updateInStorage.js', updateInStorage);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/scenarios/persistScenarioInStorage.js');
}
