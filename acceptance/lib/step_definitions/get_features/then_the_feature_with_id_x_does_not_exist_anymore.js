'use strict';

const getBook = require('../../books/get_book.js');
require('chai').should();

module.exports = () => {
	this.Then(/^the feature with id "([^"]*)" does not exist anymore$/, (idAlias, done) => {
		const world = this.world;
		const featureId = world[idAlias];

		getBook(world, () => {
			const responseBody = world.lastResponseBody;
			let foundFeature = false;
			responseBody.items.forEach(feature => {
				if (feature.id === featureId && !foundFeature) foundFeature = true;
			});
			foundFeature.should.equal(false);
			done();
		});
	});
};
