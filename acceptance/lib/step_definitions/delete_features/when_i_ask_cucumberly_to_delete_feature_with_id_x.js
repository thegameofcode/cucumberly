'use strict';

const request = require('request'),
	should = require('chai').should(),
	config = require('../../../../src/config.js');

module.exports = () => {
	this.When(/^I ask cucumberly to delete feature with id "([^"]*)"$/, (idAlias, done) => {
		const world = this.world;
		const featureId = world[idAlias];

		request({
			uri: config.app.url + '/api/features/' + featureId,
			method: 'DELETE',
			json: true
		}, (err, response, body) => {
			should.not.exist(err);

			world.lastResponseBody = body;
			world.lastResponseStatusCode = response.statusCode;

			done();
		});
	});
};
