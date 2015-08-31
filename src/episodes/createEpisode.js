'use strict';

const generateId = require('../idsGenerator/generateId.js'),
	_ = require('lodash'),
	persistEpisodeInStorage = require('./persistEpisodeInStorage.js');

module.exports = (request, response, next) => {
	const episodeId = generateId();

	persistEpisodeInStorage(request.context.bookId, _.assign({id: episodeId}, request.body)).then(() => {
		response.json(201, {id: episodeId});
		return next();
	});
};
