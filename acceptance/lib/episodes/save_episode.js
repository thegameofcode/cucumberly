'use strict';

const request = require('request'),
	should = require('chai').should(),
	config = require('../../../src/config.js');

module.exports = (world, bookId, episodeData, callback) => {
	request({
		uri: config.app.url + '/api/books/' + bookId + '/episodes',
		method: 'POST',
		json: true,
		body: episodeData
	}, (err, response, body) => {
		should.not.exist(err, err);

		world.lastResponseBody = body;
		world.lastResponseStatusCode = response.statusCode;
		callback();
	});
};
