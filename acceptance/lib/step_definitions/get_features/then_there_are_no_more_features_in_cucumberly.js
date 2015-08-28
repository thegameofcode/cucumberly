'use strict';

const getBooks = require('../../books/get_book.js'),
	should = require('chai').should();

module.exports = () => {
	this.Then(/^there're no more features in cucumberly$/, done => {
		const world = this.world;

		getBooks(world, () => {
			world.lastResponseBody.items.should.be.empty;
			done();
		});
	});
};
