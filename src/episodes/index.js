'use strict';

const createEpisode = require('./createEpisode.js');

module.exports = server => {
	server.post('/api/books/:bookId/episodes', createEpisode);
};
