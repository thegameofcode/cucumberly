'use strict';

const request = require('request'),
	should = require('chai').should(),
	config = require('../../../../src/config.js');

module.exports = () => {
	this.When(/^I ask cucumberly to delete scenario with id "([^"]*)" from feature "([^"]*)"$/, function (scenarioIdAlias, featureIdAlias, done) {
		const world = this.world;
		const scenarioId = world[scenarioIdAlias];
		const featureId = world[featureIdAlias];

		request({
			uri: config.app.url + '/api/features/' + featureId + '/scenarios/' + scenarioId,
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
