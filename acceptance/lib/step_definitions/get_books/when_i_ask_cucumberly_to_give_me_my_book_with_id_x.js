'use strict';

const getBook = require('../../books/get_book_with_id.js');

module.exports = () => {
	this.When(/^I ask cucumberly to give me my book of features with id "([^"]*)"$/, (bookAlias, done) => {
		getBook(this.world, this.world[bookAlias], done);
	});
};
