'use strict';

const getCollection = require('./getCollection.js');

let collection;
getCollection().then(collectionInstance => collection = collectionInstance);


module.exports = filter => {
	return new Promise((resolve, reject) => {

		collection.find(filter).toArray((err, retrievedDocs) => {
			if (err !== null) reject(Error(err));
			else resolve(retrievedDocs);
		});
	});
};
