'use strict';

const sinon = require('sinon'),
	config = require('../../src/config'),
	q = require('q'),
	mockery = require('mockery');
require('chai').should();


describe('Update in storage', () => {
	it('Should return a promise', () => {
		const updateInStorage = createUpdateInStorage(sinon.spy());

		q.isPromiseAlike(updateInStorage('someId')).should.equal(true);
	});

	it('Should call the collection.update method', () => {
		let usedCollectionName,
			usedElementToUpdate,
			usedFieldsToUpdate;

		const collectionStub = {
			collection: collectionName => {
				usedCollectionName = collectionName;
				return {
					update: (elementToUpdate, fieldsToUpdate, updateCallback) => {
						usedElementToUpdate = elementToUpdate;
						usedFieldsToUpdate = fieldsToUpdate;

						updateCallback(null);
					}
				}
			}
		};

		const databaseStub = {
			MongoClient: {
				connect: (url, connectCallback) => {
					connectCallback(null, collectionStub)
				}
			}
		};

		const updateInStorage = createUpdateInStorage(databaseStub);

		const documentID = '123';
		const dataToUpdate = {a: 1, b: 2};

		return updateInStorage(documentID, dataToUpdate).then(() => {
			usedCollectionName.should.equal(config.database.collectionName);
			usedElementToUpdate.should.deep.equal({id: documentID});
			usedFieldsToUpdate.should.deep.equal({$set: dataToUpdate});
		});
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});


function createUpdateInStorage(databaseStub) {
	mockery.registerMock('mongodb', databaseStub);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/storage/updateInStorage.js');
}
