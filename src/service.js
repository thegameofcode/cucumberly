'use strict';

const async = require('async');
const mongoose = require('mongoose');
const restify = require('restify');
const registerServices = require('./registerServices');

const config = require('./config');
const log = require('./log.js');

const server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get(/\/html\/?.*/,
	restify.serveStatic({
		'directory': __dirname,
		'default': 'index.html'
	})
);

registerServices(server);

module.exports = {
	start: (port, callback) => {
		server.listen(port, () => {
			log.warn('port', port);
			log.warn('%s listening at %s', server.name, server.url);
		});
		callback()
	},
	stop: (callback) => {
		server.close(callback);
	}
};