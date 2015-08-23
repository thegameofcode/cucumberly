'use strict';

const request = require('request'),
    should = require('chai').should(),
    config = require('../../../../src/config.js');


module.exports = () => {
    this.When(/^I ask cucumberly to give me my features$/, done => {
        const world = this.world;

        request({
            uri: config.APP_URL + '/api/features',
            method: 'GET',
            json: true
        }, (err, response, body) => {
            should.not.exist(err);
            world.lastResponseBody = body;
            world.lastResponseStatusCode = response.statusCode;
            done()
        });
    });
};
