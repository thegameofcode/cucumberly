'use strict';

const sinon = require('sinon'),
	q = require('q'),
	mockery = require('mockery'),
	should = require('chai').should();

describe('Persist episode in storage', () => {

	it('Should persist new episodes as part of a book', done => {
		let deferred = q.defer();
		let promise = deferred.promise;

		let updateInStorageStub = sinon.stub();
		updateInStorageStub.returns(promise);

		const persistEpisodeInStorage = createPersistEpisodeInStorage(updateInStorageStub);

		const episodeBody = {
			name: 'some name',
			steps: 1
		};
		persistEpisodeInStorage('abc123', episodeBody).then(() => {
			updateInStorageStub.calledOnce.should.equal(true);

			updateInStorageStub.args[0][0].should.deep.equal({id: 'abc123'});
			updateInStorageStub.args[0][1].should.deep.equal({$push: {'episodes': episodeBody}});
			done();
		});

		deferred.resolve();
	});

	afterEach(() => {
		mockery.deregisterAll();
		mockery.disable();
	});
});


function createPersistEpisodeInStorage(updateInStorage) {
	mockery.registerMock('../storage/updateInStorage.js', updateInStorage);

	mockery.enable({
		useCleanCache: true,
		warnOnReplace: false,
		warnOnUnregistered: false
	});

	return require('../../src/episodes/persistEpisodeInStorage.js');
}
