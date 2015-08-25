'use strict';

const retrieveFromStorage = require('./../../storage/retrieveFromStorage.js');

module.exports = (request, response, next) => {
	retrieveFromStorage({featureId: request.context.featureId}).then(scenarios => {
		response.json(200, assembleBody(scenarios));
		return next();
	});
};

function assembleBody(scenarios) {
	return {items: scenarios}
}
