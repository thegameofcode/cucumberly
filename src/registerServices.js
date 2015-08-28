'use strict';

const modules = [
    require('./features'),
    require('./books')
];

module.exports = (server) => {
    modules.forEach(module => {
        module(server);
    });
};
