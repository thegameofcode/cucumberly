'use strict';

const sinon = require('sinon'),
	config = require('../../src/config'),
	q = require('q'),
	mockery = require('mockery');
require('chai').should();

describe('Persist on storage', () => {
	it('Should return a promise', () => {
		const persistOnStorage = createPersistOnStorage(() => {return {then: () => {}}});

		q.isPromiseAlike(persistOnStorage('persist something')).should.equal(true);
	});

	it('Should call the db publishValue method', () => {
		let dataSentToPersist;

		const collectionStub = () => {
			return {
				then: (funcToInvoke => {
					funcToInvoke({
						insertOne: (dataToPersist, insertOneCallback) => {
							dataSentToPersist = dataToPersist;
							insertOneCallback(null);

						}
					});
				})
			};
		};

		const persistOnStorage = createPersistOnStorage(collectionStub);

		const dataToPersist = {some: 'data'};
		return persistOnStorage(dataToPersist).then(() => {
			dataSentToPersist.should.deep.equal(dataToPersist);
		});
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});

function createPersistOnStorage(collectionStub) {
	mockery.registerMock('./getCollection.js', collectionStub);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/storage/persistOnStorage.js');
}
