"use strict";

module.exports = (server) => {

    server.get('/api/ping',
        (req,res,next) => {
            res.send(200,{pong:true});
            next();
        });

//    server.get('/api/', );
//    server.post('/api/', );

};