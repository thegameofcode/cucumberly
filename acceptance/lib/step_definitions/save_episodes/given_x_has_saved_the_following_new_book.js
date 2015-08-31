'use strict';

const saveEpisode = require('../../episodes/save_episode.js');

module.exports = () => {
	this.Given(/^\$FRONT_END_APP has saved the following new episode as part of book "([^"]*)"$/, (bookIdAlias, episodeDataTable, done) => {
		const world = this.world;

		saveEpisode(world, world[bookIdAlias], episodeDataTable.hashes()[0], done);
	});
};
