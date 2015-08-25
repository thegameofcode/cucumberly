'use strict';

const request = require('request'),
    should = require('chai').should(),
    config = require('../../../src/config.js');


module.exports = (world, featureData, callback) => {
    request({
        uri: config.app.url + '/api/features',
        method: 'POST',
        json: true,
        body: assembleBody(featureData)
    }, (err, response, body) => {
        should.not.exist(err, err);

        world.lastResponseBody = body;
        world.lastResponseStatusCode = response.statusCode;
        callback();
    });
};


function assembleBody(featureData) {
    return {
        name: featureData.name,
        description: {
            beneficiary: featureData.beneficiary,
            motivation: featureData.motivation,
            expectedBehaviour: featureData['expected behaviour']
        }
    }
}
