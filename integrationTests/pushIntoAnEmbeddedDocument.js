'use strict';

const should = require('chai').should(),
	deleteFromStorage = require('../src/storage/deleteFromStorage.js'),
	persistOnStorage = require('../src/storage/persistOnStorage.js'),
	retrieveFromStorage = require('../src/storage/retrieveFromStorage.js'),
	updateInStorage = require('../src/storage/updateInStorage.js'),
	_ = require('lodash');

describe('Push into an embedded document', () => {
	before(done => {
		_.delay(done, 500);
	});

	it('Should push into an existing array', done => {
		const savedDocument = {
			firstField: 'some value',
			secondField: [1, 2]
		};

		const updateQuery = {$push: {"secondField": 3}};

		persistOnStorage(savedDocument)
			.then(() => updateInStorage({firstField: 'some value'}, updateQuery))
			.then(() => retrieveFromStorage({firstField: 'some value'}))
			.then(retrievedDocuments => {
				should.exist(retrievedDocuments[0]);

				const expectedDocument = {
					firstField: 'some value',
					secondField: [1, 2, 3]
				};

				delete retrievedDocuments[0]._id;
				retrievedDocuments[0].should.deep.equal(expectedDocument);
				done()
			});
	});

	it('Should push into a non existing array', done => {
		const savedDocument = {
			firstField: 'some value'
		};

		const updateQuery = {$push: {"secondField": 1}};

		const expectedDocument = {
			firstField: 'some value',
			secondField: [1]
		};

		persistOnStorage(savedDocument)
			.then(() => updateInStorage({firstField: 'some value'}, updateQuery))
			.then(() => retrieveFromStorage({firstField: 'some value'}))
			.then(retrievedDocuments => {
				should.exist(retrievedDocuments[0]);

				delete retrievedDocuments[0]._id;
				retrievedDocuments[0].should.deep.equal(expectedDocument);
				done()
			});
	});

	it('Should push into an existing hash', done => {
		const documentToSave = {
			firstField: 'some value',
			secondField: {
				a: 1,
				b: 2
			}
		};

		const updateQuery = {$set: {'secondField.c': 3}};

		const expectedUpdatedDocument = {
			firstField: 'some value',
			secondField: {
				a: 1,
				b: 2,
				c: 3
			}
		};

		persistOnStorage(documentToSave)
			.then(() => updateInStorage({firstField: 'some value'}, updateQuery))
			.then(() => retrieveFromStorage({firstField: 'some value'}))
			.then(retrievedDocuments => {
				should.exist(retrievedDocuments[0]);

				delete retrievedDocuments[0]._id;
				retrievedDocuments[0].should.deep.equal(expectedUpdatedDocument);
				done()
			})
			.catch(err => {
				done(err);
			});
	});

	it('Should push into a not existing hash', done => {
		const documentToSave = {
			firstField: 'some value'
		};

		const updateQuery = {$set: {'secondField.c': 3}};

		const expectedUpdatedDocument = {
			firstField: 'some value',
			secondField: {
				c: 3
			}
		};

		persistOnStorage(documentToSave)
			.then(() => updateInStorage({firstField: 'some value'}, updateQuery))
			.then(() => retrieveFromStorage({firstField: 'some value'}))
			.then(retrievedDocuments => {
				should.exist(retrievedDocuments[0]);

				delete retrievedDocuments[0]._id;
				retrievedDocuments[0].should.deep.equal(expectedUpdatedDocument);
				done()
			})
			.catch(err => {
				done(err);
			});
	});

	it('Should update an array into a embedded document', done => {
		const documentToSave = {
			firstField: 'some value',
			scenarios: [
				{
					name: 'first scenario',
					id: 123,
					steps: {
						given: [1, 2, 3],
						when: [6, 6],
						then: [1, 2, 3]
					}
				}
			]
		};

		const findElementQuery = {firstField: 'some value', 'scenarios.id': 123};
		const updateQuery = {$set: {'scenarios.$.steps.when': [1, 2, 3]}};

		const expectedUpdatedDocument = {
			firstField: 'some value',
			scenarios: [
				{
					name: 'first scenario',
					id: 123,
					steps: {
						given: [1, 2, 3],
						when: [1, 2, 3],
						then: [1, 2, 3]
					}
				}
			]
		};

		persistOnStorage(documentToSave)
			.then(() => updateInStorage(findElementQuery, updateQuery))
			.then(() => retrieveFromStorage({firstField: 'some value'}))
			.then(retrievedDocuments => {
				should.exist(retrievedDocuments[0]);

				delete retrievedDocuments[0]._id;
				retrievedDocuments[0].should.deep.equal(expectedUpdatedDocument);
				done()
			})
			.catch(err => {
				done(err);
			});
	});


	it('Persist new scenarios as part of books and episodes', done => {
		const documentToSave = {
			id: 'book-123',
			episodes: [
				{
					name: 'first scenario',
					id: 'episode-123',
					features: [
						{a: 1}
					]
				}
			]
		};

		const findElementQuery = {id: 'book-123', 'episodes.id': 'episode-123'};
		const updateQuery = {$push: {'episodes.$.features': {b: 2}}};


		const expectedUpdatedDocument = {
			id: 'book-123',
			episodes: [
				{
					name: 'first scenario',
					id: 'episode-123',
					features: [
						{a: 1},
						{b: 2}
					]
				}
			]
		};

		persistOnStorage(documentToSave)
			.then(() => updateInStorage(findElementQuery, updateQuery))
			.then(() => retrieveFromStorage({id: 'book-123'}))
			.then(retrievedDocuments => {
				should.exist(retrievedDocuments[0]);

				delete retrievedDocuments[0]._id;
				retrievedDocuments[0].should.deep.equal(expectedUpdatedDocument);
				done()
			})
			.catch(err => {
				done(err);
			});


	});


	afterEach(done => {
		deleteFromStorage({}).then(done);
	});
});
