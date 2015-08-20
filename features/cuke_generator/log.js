'use strict';

const config = require('./config.js');
const bunyan = require('bunyan');
module.exports = bunyan.createLogger({
    name: config.APP_NAME,
    stream: process.stdout,
    level: config.LOG_LEVEL || 'error',
    formatter: 'pretty'
});
