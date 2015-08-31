'use strict';

const _ = require('lodash');
require('chai').should();

module.exports = () => {
	this.Then(/^the retrieved book is$/, (bookDataTable, done) => {
		const expectedBookData = bookDataTable.hashes()[0];

		const retrievedBook = this.world.lastResponseBody;

		const foundBook = _.isEqual(expectedBookData, retrievedBook);
		foundBook.should.equal(true);

		done();
	});
};
