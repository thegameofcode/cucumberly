'use strict';

module.exports = () => {
	this.Given(/^the book has the id "([^"]*)"$/, (bookAlias, done) => {
		this.world[bookAlias] = this.world.lastResponseBody.id;
		done();
	});
};
