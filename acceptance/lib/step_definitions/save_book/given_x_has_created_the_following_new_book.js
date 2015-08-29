'use strict';

module.exports = () => {
	this.Given(/^\$FRONT_END_APP has created the following new book$/, (bookDataTable, done) => {

		this.world.newBook = bookDataTable.hashes()[0];
		done();
	});
};
