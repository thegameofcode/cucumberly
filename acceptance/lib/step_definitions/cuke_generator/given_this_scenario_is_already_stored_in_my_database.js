'use strict';

const request = require('request'),
    config = require('../../../../src/config.js'),
    should = require('chai').should();

module.exports = ()=> {
    this.Given(/^this scenario is already stored in my database$/, callback => {
        request({
            uri: config.backdoor.url + '/save-scenario',
            method: 'POST',
            json: true,
            body: this.world.cukeGeneratorDefaultScenario
        }, (err, response) => {
            should.not.exist(err);
            response.statusCode.should.equal(201);
            callback();
        });
    });
};
