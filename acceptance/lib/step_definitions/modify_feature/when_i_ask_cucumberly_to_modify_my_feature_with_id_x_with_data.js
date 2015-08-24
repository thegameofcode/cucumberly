'use strict';

const request = require('request'),
	should = require('chai').should(),
	config = require('../../../../src/config.js');

module.exports = () => {
	this.When(/^I ask cucumberly to modify my feature with id "([^"]*)" with data$/, (idAlias, featureModificationsTable, done) => {

		const world = this.world;
		const featureId = world[idAlias];

		request({
			uri: config.APP_URL + '/api/features/' + featureId,
			method: 'PUT',
			json: true,
			body: featureModificationsTable.hashes()[0]
		}, (err, response, body) => {
			should.not.exist(err);

			world.lastResponseBody = body;
			world.lastResponseStatusCode = response.statusCode;

			done();
		});
	});
};
