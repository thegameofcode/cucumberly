'use strict';

const request = require('request'),
	should = require('chai').should(),
	config = require('../../../src/config.js');

module.exports = (world, callback) => {
	request({
		uri: config.app.url + '/api/books',
		method: 'GET',
		json: true
	}, (err, response, body) => {
		should.not.exist(err, err);

		world.lastResponseBody = body;
		world.lastResponseStatusCode = response.statusCode;
		callback();
	});
};
