'use strict';

const request = require('request'),
	should = require('chai').should(),
	config = require('../../../../src/config.js');

module.exports = () => {
	this.When(/^I ask cucumberly to give me my scenarios of feature "([^"]*)"$/, function (featureAlias, done) {
		const world = this.world;
		request({
			uri: config.app.url + '/api/features/' + world[featureAlias] + '/scenarios',
			method: 'GET',
			json: true
		}, (err, response, body) => {
			should.not.exist(err);
			world.lastResponseBody = body;
			world.lastResponseStatusCode = response.statusCode;
			done();
		});
	});
};
