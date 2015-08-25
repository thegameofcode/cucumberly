'use strict';

const request = require('request'),
	should = require('chai').should(),
	config = require('../../../src/config.js');

module.exports = (world, scenarioData, featureId, callback) => {
	request({
		uri: config.app.url + '/api/features/' + featureId + '/scenarios',
		method: 'POST',
		json: true,
		body: assembleBody(scenarioData)
	}, (err, response, body) => {
		should.not.exist(err, err);

		world.lastResponseBody = body;
		world.lastResponseStatusCode = response.statusCode;
		callback();
	});
};

function assembleBody(scenarioData) {
	return {
		name: scenarioData.name,
		description: scenarioData.description,
		steps: {
			given: JSON.parse(scenarioData.given),
			when: JSON.parse(scenarioData.when),
			then: JSON.parse(scenarioData.then)
		}
	}
}
