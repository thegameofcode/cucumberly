'use strict';

const updateInStorage = require('../storage/updateInStorage.js');

module.exports = (request, response, next) => {
	updateInStorage(request.context.featureId, request.body).then(() => {
		response.json(200);
		return next();
	});
};
