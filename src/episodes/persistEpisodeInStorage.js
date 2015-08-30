'use strict';

const updateInStorage = require('../storage/updateInStorage.js');

module.exports = (bookId, episodeBody) => {
	return updateInStorage({id: bookId}, {$push: {'episodes': episodeBody}});
};
