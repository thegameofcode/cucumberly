'use strict';

module.exports = () => {
	this.Given(/^\$FRONT_END_APP has created the following new episode$/, (episodeDataTable, done) => {

		this.world.newEpisode = episodeDataTable.hashes()[0];
		done();
	});
};
