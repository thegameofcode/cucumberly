'use strict';

const updateInStorage = require('../storage/updateInStorage.js'),
	_ = require('lodash');

module.exports = (bookId, episodeId, featureId, featureBody) => {
	const queryToFindEpisode = {id: bookId, 'episodes.id': episodeId};
	const queryToPushFeature = {$push: {'episodes.$.features': _.assign({id: featureId}, featureBody)}};

	return updateInStorage(queryToFindEpisode, queryToPushFeature);
};
