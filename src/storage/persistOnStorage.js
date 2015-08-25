'use strict';

const getCollection = require('./getCollection.js');

let collection;
getCollection().then(collectionInstance => collection = collectionInstance);

module.exports = dataToPersist => {
	return new Promise((resolve, reject) => {
		collection.insertOne(dataToPersist, err => {
			if (err !== null) {
				reject(Error(err));
			} else {
				resolve();
			}
		});
	});
};
