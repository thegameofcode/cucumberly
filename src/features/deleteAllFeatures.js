'use strict';

const deleteFromStorage = require('../storage/deleteFromStorage.js');

module.exports = (request, response, next) => {
	deleteFromStorage({}).then(() => {
		response.json(204);
		return next();
	});
};
