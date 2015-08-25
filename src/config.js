'use strict';

const fs = require('fs');
const configJson = fs.existsSync(process.cwd() + '/src/config.json') ? require('./config.json') : {};

module.exports = {
    app: {
		name: process.env.IGZ006_APP_NAME || configJson.app.name,
		port: process.env.IGZ006_PORT || process.env.PORT || configJson.app.port,
		url: 'http://localhost:4000'
	},
	database: {
		url: process.env.IGZ006_MONGO_URL || configJson.database.url,
		collectionName: 'cucumberly'
	},
	logLevel: 'info'
};
