'use strict';

const config = require('./config');
const service = require( './service.js');

service.start(config.MONGO_URL, config.PORT, function (){ });
