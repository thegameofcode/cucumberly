'use strict';

const mockery = require('mockery'),
	sinon = require('sinon'),
	q = require('q'),
	should = require('chai').should();

describe('Update scenario in storage', () => {
	it('Should be able to update the scenario name', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const updateScenario = createUpdateScenario(updateInStorageStub);

		updateScenario('featureID123', 'scenarioID123', {name: 'AbC'}).then(() => {
			updateInStorageStub.calledOnce.should.equal(true);

			updateInStorageStub.args[0][0].should.deep.equal({id: 'featureID123', 'scenarios.id': 'scenarioID123'});
			updateInStorageStub.args[0][1].should.deep.equal({$set: {'scenarios.$.name': 'AbC'}});
			done();
		});

		deferred.resolve();
	});


	it('Should be able to update the given steps', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const updateScenario = createUpdateScenario(updateInStorageStub);

		const elementsToUpdate = {
			steps: {given: [1, 2, 3]}
		};
		updateScenario('featureID123', 'scenarioID123', elementsToUpdate).then(() => {
			updateInStorageStub.calledOnce.should.equal(true);

			updateInStorageStub.args[0][0].should.deep.equal({id: 'featureID123', 'scenarios.id': 'scenarioID123'});
			updateInStorageStub.args[0][1].should.deep.equal({$set: {'scenarios.$.steps.given': [1, 2, 3]}});
			done();
		});

		deferred.resolve();
	});

	it('Should be able to update the when steps', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const updateScenario = createUpdateScenario(updateInStorageStub);

		const elementsToUpdate = {
			steps: {when: [1, 2, 3]}
		};
		updateScenario('featureID123', 'scenarioID123', elementsToUpdate).then(() => {
			updateInStorageStub.calledOnce.should.equal(true);

			updateInStorageStub.args[0][0].should.deep.equal({id: 'featureID123', 'scenarios.id': 'scenarioID123'});
			updateInStorageStub.args[0][1].should.deep.equal({$set: {'scenarios.$.steps.when': [1, 2, 3]}});
			done();
		});

		deferred.resolve();
	});


	it('Should be able to update the then steps', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const updateScenario = createUpdateScenario(updateInStorageStub);

		const elementsToUpdate = {
			steps: {then: [1, 2, 3]}
		};
		updateScenario('featureID123', 'scenarioID123', elementsToUpdate).then(() => {
			updateInStorageStub.calledOnce.should.equal(true);

			updateInStorageStub.args[0][0].should.deep.equal({id: 'featureID123', 'scenarios.id': 'scenarioID123'});
			updateInStorageStub.args[0][1].should.deep.equal({$set: {'scenarios.$.steps.then': [1, 2, 3]}});
			done();
		});

		deferred.resolve();
	});


	it('Should be able to update more than one field at the same time', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		const updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const updateScenario = createUpdateScenario(updateInStorageStub);

		const elementsToUpdate = {
			name: 'new name',
			steps: {then: [1, 2, 3]}
		};
		updateScenario('featureID123', 'scenarioID123', elementsToUpdate).then(() => {
			updateInStorageStub.calledOnce.should.equal(true);

			updateInStorageStub.args[0][0].should.deep.equal({id: 'featureID123', 'scenarios.id': 'scenarioID123'});
			updateInStorageStub.args[0][1].should.deep.equal({$set: {'scenarios.$.name': 'new name','scenarios.$.steps.then': [1, 2, 3]}});
			done();
		});

		deferred.resolve();
	});


	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});


function createUpdateScenario(updateInStorageStub) {
	mockery.registerMock('../storage/updateInStorage.js', updateInStorageStub);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/scenarios/updateScenarioInStorage.js');
}
