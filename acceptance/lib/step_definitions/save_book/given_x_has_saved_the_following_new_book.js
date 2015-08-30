'use strict';

const saveBook = require('../../books/save_book.js');

module.exports = () => {
	this.Given(/^\$FRONT_END_APP has saved the following new book$/, (bookDataTable, done) => {
		saveBook(this.world, bookDataTable.hashes()[0], done);
	});
};
