'use strict';

const service = require('../service_test.js');

module.exports = () => {

    this.registerHandler('BeforeFeatures',
        (evt, done) => {
            done();
        });

    this.registerHandler('AfterFeatures',
        (evt, done) => {
            done();
        });

    this.Before(
        (done) => {
            this.world = {};
            done();
        });

};
