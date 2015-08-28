'use strict';

const modules = [
    require('./features'),
    require('./books'),
    require('./scenarios')
];

module.exports = (server) => {
    modules.forEach(module => {
        module(server);
    });
};
