'use strict';

const modules = [
    require('./features'),
    require('./books'),
    require('./scenarios'),
	require('./episodes')
];

module.exports = (server) => {
    modules.forEach(module => {
        module(server);
    });
};
