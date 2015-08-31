'use strict';

const sinon = require('sinon'),
	q = require('q'),
	_ = require('lodash'),
	mockery = require('mockery'),
	should = require('chai').should();


describe('Persist feature on storage', () => {

	it('Should persist new features as part of books and episodes', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		let updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const persistFeatureInStorage = createPersistFeatureInStorage(updateInStorageStub);

		const featureBody = {
			name: 'some name',
			description: 'hi there'
		};

		const bookId = 'book-123',
			episodeId = 'episode-123',
			featureId = 'feature-123';


		persistFeatureInStorage(bookId, episodeId, featureId, featureBody).then(() => {
			updateInStorageStub.calledOnce.should.equal(true);


			updateInStorageStub.args[0][0].should.deep.equal( {id: bookId, 'episodes.id': episodeId});

			const expectedElementToPush = _.assign({id: featureId}, featureBody);
			updateInStorageStub.args[0][1].should.deep.equal({$push: {'episodes.$.features': expectedElementToPush}});
			done();
		});

		deferred.resolve();
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});

function createPersistFeatureInStorage(updateInStorage) {
	mockery.registerMock('../storage/updateInStorage.js', updateInStorage);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/features/persistFeatureOnStorage.js');
}
