'use strict';

const request = require('request'),
    config = require('../../../src/config.js'),
    should = require('chai').should();

module.exports = () => {
    this.When(/^I request to save the feature to cucumberly$/, done => {
        const world = this.world;
        request({
            uri: config.APP_URL + '/api/features',
            method: 'POST',
            json: true,
            body: assembleBody(world.newFeature)
        }, (err, response, body) => {
            should.not.exist(err, err);

            world.lastResponseBody = body;
            world.lastResponseStatusCode = response.statusCode;
            done();
        });
    });
};

function assembleBody (featureData) {
    return {
        name: featureData.name,
        description: {
            beneficiary: featureData.beneficiary,
            motivation: featureData.motivation,
            expectedBehaviour: featureData['expected behaviour']
        }
    }
}
