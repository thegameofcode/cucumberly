'use strict';

const should = require('chai').should(),
    q = require('q'),
    mockery = require('mockery');


describe('Retrieve all entries from storage', () => {
    it('Should return a promise', () => {
        const retrieveFromStorage = createRetrieveFromStorage(() => {return {then: () => {}}});

        q.isPromiseAlike(retrieveFromStorage())
    });

    it('Should return retrieved data' , () => {
        const storedData = {'store me': 'inside the db'};

        let usedFilterToFindItems;

		const collectionStub = () => {
			return {
				then: (funcToInvoke => {
					funcToInvoke({
						find: (filterQueryToFind) => {
							return {
								toArray: (toArrayCallback) => {
									usedFilterToFindItems = filterQueryToFind;
									toArrayCallback(null, storedData);
								}
							}
						}
					});
				})
			};
		};


        const retrieveFromStorage = createRetrieveFromStorage(collectionStub);
        const filter = {some: 'info'};
        return retrieveFromStorage(filter).then(retrievedData => {
            should.exist(retrievedData);
            retrievedData.should.deep.equal(storedData);
            usedFilterToFindItems.should.deep.equal(filter);
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });
});


function createRetrieveFromStorage (collectionStub) {
    mockery.registerMock('./getCollection.js', collectionStub);

    mockery.enable({
        useCleanCache: true,
        warnOnReplace: false,
        warnOnUnregistered: false
    });

    return require('../../src/storage/retrieveFromStorage.js');
}
