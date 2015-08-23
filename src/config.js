'use strict';

const fs = require('fs');
const config = fs.existsSync(process.cwd() + '/src/config.json') ? require('./config.json') : {};

module.exports = {
    APP_NAME: process.env.IGZ006_APP_NAME || config.APP_NAME,
    PORT: process.env.IGZ006_PORT || process.env.PORT || config.PORT,
    APP_URL: 'http://localhost:4000',

    BACKDOOR_PORT: config.BACKDOOR_PORT,
    BACKDOOR_URL: 'http://localhost:' + config.BACKDOOR_PORT + '/backdoor',

    MONGO_URL: process.env.IGZ006_MONGO_URL || config.MONGO_URL,
    DB_COLLECTION_NAME: 'cucumberly',

    LOG_LEVEL: process.env.IGZ006_LOG_LEVEL || 'INFO'
};
