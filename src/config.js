'use strict';

const fs = require('fs');
const config = fs.existsSync(process.cwd()+'/src/config.json') ? require('./config.json') : {};

module.exports = {
    APP_NAME : process.env.IGZ006_APP_NAME || config.APP_NAME,
    PORT : process.env.IGZ006_PORT || process.env.PORT || config.PORT,
    PORT_TEST : process.env.IGZ006_PORT_TEST || config.PORT_TEST,
    MONGO_URL: process.env.IGZ006_MONGO_URL || config.MONGO_URL,
    LOG_LEVEL : process.env.IGZ006_LOG_LEVEL || 'INFO',
};

