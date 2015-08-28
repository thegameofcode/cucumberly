'use strict';

const getBookOfFeatures = require('../../books/get_book.js');

module.exports = () => {
	this.Then(/^I ask cucumberly to give me my book of features$/, done => {
		getBookOfFeatures(this.world, done);
	});

	this.When(/^I ask cucumberly to give me my book of features$/, done => {
		getBookOfFeatures(this.world, done);
	});
};
