'use strict';

const restify = require('restify'),
    async = require('async'),
    config = require('../config.js'),
    mongoose = require('mongoose');

const server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());

require('./save_scenario')(server);

function startServer() {
    async.series(
        [next => {
            mongoose.connect(config.MONGO_URL, err => {
                const db = mongoose.connection;
                db.on('error', err => console.log('mongoose err', err));
                db.once('open', () => console.log('mongoose ok'));

                if (err) console.log(err);
                else console.log('MongoDB connected to ' + config.MONGO_URL);

                next();
            });
        }, next => {
            server.listen(config.BACKDOOR_PORT, () => {
                console.log('port', config.BACKDOOR_PORT);
                console.log('%s listening at %s', server.name, server.url);
                next();
            });
        }]
    );
}

function stopServer() {
    server.close(() => mongoose.disconnect(callback));
}

module.exports = {
    start: startServer,
    stop: stopServer
};
