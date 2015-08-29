'use strict';

const retrieveBook = require('./retrieveBook.js'),
	createBook = require('./createBook.js');

module.exports = server => {
	server.get('/api/book', retrieveBook);
	server.post('/api/book', createBook);
};
