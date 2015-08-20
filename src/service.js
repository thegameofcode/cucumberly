'use strict';

const async = require('async');
const mongoose = require('mongoose');
const restify = require('restify');

const config = require('./config');
const log = require('./log.js');

const server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use( require('./basic-security') );

server.get(/\/html\/?.*/,
    restify.serveStatic({
        'directory': __dirname,
        'default': 'index.html'
    })
);

require('./schemas');
require('./routes')(server);

module.exports = {
    start: (mongourl,port, callback) => {
        log.info( 'starting', config.APP_NAME, mongourl,port );
        async.series(
            [
                (next) => {
                    mongoose.connect(mongourl, (err) => {
                        const db = mongoose.connection;
                        db.on('error', (err) => {
                            log.error('mongoose err', err);
                        });
                        db.once('open', () => {
                            log.info('mongoose ok');
                        });

                        if(err){
                            log.error(err);
                        }
                        else {
                            log.warn('MongoDB connected to ' + mongourl);
                        }
                        next();
                    });
                },
                (next) => {
                    server.listen(port, () => {
                        log.warn('port', port);
                        log.warn('%s listening at %s', server.name, server.url);
                        next();
                    });
                }
            ],
            () => {
                callback();
            }
        );
    },
    stop: (callback) =>{
        server.close(() => {
            mongoose.disconnect(callback);
        });
    }
};