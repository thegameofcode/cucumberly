'use strict';

const sinon = require('sinon'),
    q = require('q'),
    _ = require('lodash'),
    mockery = require('mockery'),
    should = require('chai').should();

describe('Create feature', () => {

    const idsGeneratorStub = () => '123';

    it('Should call the next callback', done => {
        let deferred = q.defer();
        let promise = deferred.promise;
        let persistOnStorageStub = sinon.stub();
        persistOnStorageStub.returns(promise);

        const createFeature = getCreateFeatureInstance(idsGeneratorStub, persistOnStorageStub);

        deferred.resolve();
        createFeature(mockRequest(), createResponseStub(), done);
    });

    it('Should return 201 created', done => {
        const responseStub = createResponseStub();
        const responseSpy = sinon.spy(responseStub, 'json');

        let deferred = q.defer();
        let promise = deferred.promise;
        let persistOnStorageStub = sinon.stub();
        persistOnStorageStub.returns(promise);

        const createFeature = getCreateFeatureInstance(idsGeneratorStub, persistOnStorageStub);
        createFeature(mockRequest(), responseStub, checkResponse);

        deferred.resolve();
        function checkResponse() {
            responseSpy.args[0][0].should.equal(201);
            done();
        }
    });

    it('Should return an id property', done => {
        const responseStub = createResponseStub();
        const responseSpy = sinon.spy(responseStub, 'json');

        let deferred = q.defer();
        let promise = deferred.promise;
        let persistOnStorageStub = sinon.stub();
        persistOnStorageStub.returns(promise);

        const idsGeneratorStub = sinon.stub();
        idsGeneratorStub.returns('abc123');

        const createFeature = getCreateFeatureInstance(idsGeneratorStub, persistOnStorageStub);
        createFeature(mockRequest(), responseStub, checkResponse);

        deferred.resolve();
        function checkResponse() {
            const body = responseSpy.args[0][1];
            should.exist(body.id);
            body.id.should.equal('abc123');
            done();
        }
    });

    it('Should store the features data and id', done => {
        const responseStub = createResponseStub();

        let deferred = q.defer();
        let promise = deferred.promise;

        let persistOnStorageStub = sinon.stub();
        persistOnStorageStub.returns(promise);
        const createFeature = getCreateFeatureInstance(idsGeneratorStub, persistOnStorageStub);

        const mockedRequest = mockRequest();
        createFeature(mockedRequest, responseStub, checkResponse);

        deferred.resolve();
        function checkResponse() {
            persistOnStorageStub.calledOnce.should.equal(true);

            const elementsToPersist = persistOnStorageStub.args[0][0];
            const expectedPersistedElements = _.assign(mockedRequest.body, {id: idsGeneratorStub()});

            elementsToPersist.should.deep.equal(expectedPersistedElements);
            done();
        }
    });

    it('Should return a 409 response code if the feature name is missing', done => {
        const responseStub = createResponseStub();
        const responseSpy = sinon.spy(responseStub, 'json');

        const createFeature = getCreateFeatureInstance(sinon.stub(), sinon.stub());
        let mockedRequest = mockRequest();
        delete mockedRequest.body.name;
        createFeature(mockedRequest, responseStub, checkResponse);

        function checkResponse() {
            responseSpy.args[0][0].should.equal(409);
            responseSpy.args[0][1].should.deep.equal({error: 'missing name'})

            done();
        }
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });
});

function getCreateFeatureInstance(idsMock, persistOnStorageStub) {
    mockery.registerMock('../idsGenerator/generateId.js', idsMock);
    mockery.registerMock('../storage/persistOnStorage.js', persistOnStorageStub);

    mockery.enable({
        useCleanCache: true,
        warnOnReplace: false,
        warnOnUnregistered: false
    });

    return require('../../src/features/createFeature');
}

function createResponseStub() {
    return {
        json: () => {}
    }
}

function mockRequest() {
    return {
        body: {
            name: 'some name',
            b: 2
        }
    };
}
