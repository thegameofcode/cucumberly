'use strict';

const should = require('chai').should();

module.exports = () => {
	this.Then(/^the body has a "([^"]*)" field with data "([^"]*)"$/, (fieldName, fieldValue, done) => {
		const body = this.world.lastResponseBody;
		
		should.exist(body[fieldName]);
		body[fieldName].should.equal(fieldValue);
		done();
	});
};
