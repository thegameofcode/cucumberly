'use strict';

const retrieveFromStorage = require('./../storage/retrieveFromStorage.js');

module.exports = (request, response, next) => {
	retrieveFromStorage({}).then(retrievedDocuments => {
		response.json(200, {items: retrievedDocuments});
		return next();
	});
};
