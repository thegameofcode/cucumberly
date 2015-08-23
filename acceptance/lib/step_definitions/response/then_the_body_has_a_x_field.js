'use strict';

module.exports = () => {
    this.Then(/^the body has a "([^"]*)" field$/, (expectedField, done) => {
        this.world.lastResponseBody.should.have.property(expectedField);
        done();
    });
};
