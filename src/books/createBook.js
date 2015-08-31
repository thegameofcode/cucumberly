'use strict';

const generateId = require('../idsGenerator/generateId.js'),
	_ = require('lodash'),
	persistOnStorage = require('../storage/persistOnStorage.js');

module.exports = (request, response, next) => {
	const bookId = generateId();

	persistOnStorage(_.assign({id: bookId}, request.body)).then(() => {
		response.json(201, {id: bookId});
		return next();
	});
};
