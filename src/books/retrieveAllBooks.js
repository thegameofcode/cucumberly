'use strict';

const retrieveFromStorage = require('./../storage/retrieveFromStorage.js');

module.exports = (request, response, next) => {
	retrieveFromStorage({}).then(retrievedDocuments => {
		response.json(200, assembleBody(retrievedDocuments));
		return next();
	});
};

function assembleBody (documents) {
	return {items: documents};
}