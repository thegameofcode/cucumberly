'use strict';

const should = require('chai').should(),
    q = require('q'),
    mockery = require('mockery');


describe('Retrieve all entries from storage', () => {
    it('Should return a promise', () => {
        const databaseStub = {};
        const retrieveFromStorage = createRetrieveFromStorage(databaseStub);

        q.isPromiseAlike(retrieveFromStorage())
    });

    it('Should return retrieved data' , () => {
        const storedData = {'store me': 'inside the db'};

        let usedCollectionName;
        let usedFilterToFindItems;
        const dbStub = {
            collection: collectionName => {
                usedCollectionName = collectionName;
                return {
                    find: (filterQueryToFind) => {
                        return {
                            toArray: (toArrayCallback) => {
                                usedFilterToFindItems = filterQueryToFind;
                                toArrayCallback(null, storedData);
                            }
                        }
                    }
                }
            }
        };

        let dbConnectedToUrl;
        const databaseStub = {
            MongoClient: {
                connect: (url, connectCallback) => {
                    dbConnectedToUrl = url;
                    connectCallback(null, dbStub)
                }
            }
        };

        const retrieveFromStorage = createRetrieveFromStorage(databaseStub);
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


function createRetrieveFromStorage (databaseStub) {
    mockery.registerMock('mongodb', databaseStub);

    mockery.enable({
        useCleanCache: true,
        warnOnReplace: false,
        warnOnUnregistered: false
    });

    return require('../../src/storage/retrieveFromStorage.js');
}
