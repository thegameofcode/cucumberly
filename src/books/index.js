'use strict';

const retrieveBook = require('./retrieveBook.js'),
	createBook = require('./createBook.js');

module.exports = server => {
	server.get('/api/books', retrieveBook);
	server.post('/api/books', createBook);
};
