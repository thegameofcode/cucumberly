'use strict';

const request = require('request'),
	should = require('chai').should(),
	config = require('../../../src/config.js');


module.exports = (world, bookData, callback) => {
	request({
		uri: config.app.url + '/api/book',
		method: 'POST',
		json: true,
		body: assembleBody(bookData)
	}, (err, response, body) => {
		should.not.exist(err, err);

		world.lastResponseBody = body;
		world.lastResponseStatusCode = response.statusCode;
		callback();
	});
};


function assembleBody(bookData) {
	return { name: bookData.name }
}
