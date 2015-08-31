'use strict';

module.exports = () => {
	this.Given(/^the episode has the id "([^"]*)"$/, (episodeIdAlias, done) => {
		this.world[episodeIdAlias] = this.world.lastResponseBody.id;
		done();
	});
};
