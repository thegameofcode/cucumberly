'use strict';

const retrieveBook = require('./retrieveBook.js');

module.exports = server => {
	server.get('/api/book', retrieveBook);
};
