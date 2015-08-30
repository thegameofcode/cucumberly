'use strict';

const saveEpisode = require('../../episodes/save_episode.js');

module.exports = () => {
	this.When(/^I request to save the episode as part of book "([^"]*)" to cucumberly$/, (bookIdAlias, done) => {
		const world = this.world;

		saveEpisode(world, world[bookIdAlias], world.newEpisode, done);
	});
};
