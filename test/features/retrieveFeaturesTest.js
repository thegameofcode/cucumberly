'use strict';

const sinon = require('sinon'),
    mockery = require('mockery'),
    should = require('chai').should(),
    q = require('q');

describe('Retrieve features', () => {
    it('Should call the next function', done => {
        let deferred = q.defer();
        let promise = deferred.promise;

        const retrieveFromStorageStub = sinon.stub();
        retrieveFromStorageStub.returns(promise);

        const retrieveFeatures = createRetrieveFeatures(retrieveFromStorageStub);
        retrieveFeatures(null, createResponseStub(), done);

        deferred.resolve();
    });

    it('Should return a 200 OK response code', done => {
        const responseStub = createResponseStub();
        const responseSpy = sinon.spy(responseStub, 'json');

        let deferred = q.defer();
        let promise = deferred.promise;

        const retrieveFromStorageStub = sinon.stub();
        retrieveFromStorageStub.returns(promise);

        const retrieveFeatures = createRetrieveFeatures(retrieveFromStorageStub);
        retrieveFeatures(null, responseStub, checkResponse);

        deferred.resolve();
        function checkResponse () {
            responseSpy.args[0][0].should.equal(200);
            done();
        }
    });

    it('Should return the stored features', done => {
        const responseStub = createResponseStub();
        const responseSpy = sinon.spy(responseStub, 'json');

        let deferred = q.defer();
        let promise = deferred.promise;

        const storageResponse = {a: 1, b: 2};
        const retrieveFromStorageStub = sinon.stub();
        retrieveFromStorageStub.returns(promise);
        
        const retrieveFeatures = createRetrieveFeatures(retrieveFromStorageStub);
        retrieveFeatures(null, responseStub, checkResponse);

        deferred.resolve(storageResponse);

        function checkResponse () {
            responseSpy.args[0][0].should.equal(200);

            const body = responseSpy.args[0][1];
            should.exist(body);
            body.should.deep.equal(storageResponse);
            done();
        }
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });
});

function createResponseStub() {
    return { json: () => {} }
}

function createRetrieveFeatures(retrieveFromStorageStub) {
    mockery.registerMock('./../storage/retrieveFromStorage.js', retrieveFromStorageStub);

    mockery.enable({
        useCleanCache: true,
        warnOnReplace: false,
        warnOnUnregistered: false
    });

    return require('../../src/features/retrieveFeatures.js');
}
