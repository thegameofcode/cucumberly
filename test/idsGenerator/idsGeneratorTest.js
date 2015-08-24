'use strict';

const idsGenerator = require('../../src/idsGenerator/generateId.js'),
    should = require('chai').should();


describe('IDs generator', () => {
    it('Should generate an id', () => {
        const generatorId = idsGenerator();

        should.exist(generatorId);
        generatorId.should.have.length.above(8);
    });

    it('Should generate different ids', () => {
        const firstId = idsGenerator(),
            secondId = idsGenerator();

        firstId.should.not.equal(secondId);
    });
});
