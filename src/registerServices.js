'use strict';

const modules = [
    require('./features')
];

module.exports = (server) => {
    modules.forEach(module => {
        module(server);
    });
};
