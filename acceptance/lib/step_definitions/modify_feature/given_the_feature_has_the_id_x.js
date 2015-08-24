'use strict';

module.exports = () => {
	this.Given(/^the feature has the id "([^"]*)"$/, (idAlias, done) => {
		this.world[idAlias] = this.world.lastResponseBody.id;
		done();
	});
};
