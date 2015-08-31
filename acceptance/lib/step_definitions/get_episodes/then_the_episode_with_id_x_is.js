'use strict';

const _ = require('lodash');
require('chai').should();

module.exports = () => {
	this.Then(/^the episode with id "([^"]*)" is$/, (episodeIdAlias, episodeDataTable, done) => {
		const episodeData = episodeDataTable.hashes()[0];
		const world = this.world;

		const retrievedBook = this.world.lastResponseBody;

		let foundEpisode = false;
		retrievedBook.episodes.forEach(episode => {
			if(episode.id === world[episodeIdAlias]) {
				delete episode.id;
				if (_.isEqual(episode, episodeData)) foundEpisode = true;
			}
		});
		foundEpisode.should.equal(true);
		done();
	});
};
