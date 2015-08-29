'use strict';

const saveBook = require('../../books/save_book.js');

module.exports = () => {
	this.When(/^I request to save the book to cucumberly$/, done => {

		const world = this.world;

		saveBook(world, world.newBook, done);
	});
};
