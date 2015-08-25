'use strict';

const config = require('./config.js');
const bunyan = require('bunyan');
module.exports = bunyan.createLogger({
    name: config.app.name,
    stream: process.stdout,
    level: config.logLevel || 'INFO',
    formatter: 'pretty'
});
