'use strict';

const retrieveBook = require('./retrieveBook.js'),
	retrieveAllBooks = require('./retrieveAllBooks.js'),
	createBook = require('./createBook.js');

module.exports = server => {
	server.get('/api/books/:bookId', retrieveBook);
	server.get('/api/books', retrieveAllBooks);
	server.post('/api/books', createBook);
};
