'use strict';

const getFeatures = require('../../features/get_features.js'),
	should = require('chai').should();

module.exports = () => {
	this.Then(/^there're no more features in cucumberly$/, done => {
		const world = this.world;

		getFeatures(world, () => {
			world.lastResponseBody.should.be.empty;
			done();
		});
	});
};
