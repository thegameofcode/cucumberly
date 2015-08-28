'use strict';

const getBook = require('../../books/get_book.js');

module.exports = () => {
	this.When(/^I ask cucumberly to give me my scenarios of feature "([^"]*)"$/, function (featureAlias, done) {
		const world = this.world;

		getBook(world, world[featureAlias], done);
	});
};
