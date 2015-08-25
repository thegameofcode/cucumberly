'use strict';

const config = require('./config');
const service = require('./service.js');

service.start(config.database.url, config.app.port, () => {});
