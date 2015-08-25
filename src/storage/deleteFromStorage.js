'use strict';

const getCollection = require('./getCollection.js');

let collection;
getCollection().then(collectionInstance => collection = collectionInstance);

module.exports = filter => {
	return new Promise((resolve, reject) => {
		collection.remove(filter, (err, result) => {
			if (err !== null) reject(err);
			else resolve();
		});
	});
};
