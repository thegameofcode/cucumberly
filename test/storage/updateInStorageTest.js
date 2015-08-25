'use strict';

const sinon = require('sinon'),
	q = require('q'),
	mockery = require('mockery');
require('chai').should();


describe('Update in storage', () => {
	it('Should return a promise', () => {
		const updateInStorage = createUpdateInStorage(() => {return {then: () => {}}});

		q.isPromiseAlike(updateInStorage('someId')).should.equal(true);
	});

	it('Should call the collection.update method', () => {
		let usedElementToUpdate,
			usedFieldsToUpdate;

		const collectionStub = () => {
			return {
				then: (funcToInvoke => {
					funcToInvoke({
						update: (elementToUpdate, fieldsToUpdate, updateCallback) => {
							usedElementToUpdate = elementToUpdate;
							usedFieldsToUpdate = fieldsToUpdate;

							updateCallback(null);
						}
					});
				})
			};
		};

		const updateInStorage = createUpdateInStorage(collectionStub);

		const documentID = '123';
		const dataToUpdate = {a: 1, b: 2};

		return updateInStorage(documentID, dataToUpdate).then(() => {
			usedElementToUpdate.should.deep.equal({id: documentID});
			usedFieldsToUpdate.should.deep.equal({$set: dataToUpdate});
		});
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});


function createUpdateInStorage(collectionStub) {
	mockery.registerMock('./getCollection.js', collectionStub);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/storage/updateInStorage.js');
}
