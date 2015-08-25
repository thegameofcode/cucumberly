'use strict';

const request = require('request'),
	should = require('chai').should(),
	config = require('../../../../src/config.js');


module.exports = () => {
	this.When(/^I ask cucumberly to modify my scenario with id "([^"]*)" from feature "([^"]*)" with data$/, (scenarioIdAlias, featureIdAlias, scenarioDataTable, done) => {

		const world = this.world;
		const featureId = world[featureIdAlias];
		const scenarioId = world[scenarioIdAlias];

		request({
			uri: config.app.url + '/api/features/' + featureId + '/scenarios/' + scenarioId,
			method: 'PUT',
			json: true,
			body: assembleBody(scenarioDataTable.hashes()[0])
		}, (err, response, body) => {
			should.not.exist(err);

			world.lastResponseBody = body;
			world.lastResponseStatusCode = response.statusCode;

			done();
		});
	});
};

function assembleBody(scenarioData) {
	return {
		name: scenarioData.name,
		description: scenarioData.description,
		steps: {
			given: addField(scenarioData.given),
			when: addField(scenarioData.when),
			then: addField(scenarioData.then)
		}
	}
}

function addField(field) {
	return field === undefined ? undefined : JSON.parse(field);
}
