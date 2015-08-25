'use strict';

const sinon = require('sinon'),
	q = require('q'),
	mockery = require('mockery');
require('chai').should();

describe('Delete from storage', () => {
	it('Should return a promise', () => {
		const updateInStorage = createDeleteFromStorage(() => {return {then: () => {}}});

		q.isPromiseAlike(updateInStorage('someId')).should.equal(true);
	});

	it('Should call the collection.remove method', () => {
		let usedFilter;

		const collectionStub = () => {
			return {
				then: (funcToInvoke => {
					funcToInvoke({
						remove: (filter, removeCallback) => {
							usedFilter = filter
							removeCallback(null);
						}
					});
				})
			};
		};

		const updateInStorage = createDeleteFromStorage(collectionStub);

		const expectedFilter = {id: '12321'};

		return updateInStorage(expectedFilter).then(() => {
			usedFilter.should.deep.equal(expectedFilter);
		});
	});


	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});

function createDeleteFromStorage(collectionStub) {
	mockery.registerMock('./getCollection.js', collectionStub);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/storage/deleteFromStorage.js');
}
