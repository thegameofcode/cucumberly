'use strict';

require('chai').should();

module.exports = () => {
    this.Then(/^the response code is (\d+)$/, (expectedStatusCode, done) => {
        this.world.lastResponseStatusCode.should.equal(Number(expectedStatusCode), JSON.stringify(this.world.lastResponseBody));
        done();
    });
};
