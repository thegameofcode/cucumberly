'use strict';

const retrieveFromStorage = require('./../storage/retrieveFromStorage.js');

module.exports = (request, response, next) => {
	retrieveFromStorage({id: request.context.bookId}).then(retrievedDocuments => {
		response.json(200, assembleBody(retrievedDocuments[0]));
		return next();
	});
};

function assembleBody (document) {
	delete document.id;
	delete document._id;
	return document;
}