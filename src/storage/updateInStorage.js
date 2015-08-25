'use strict';

const getCollection = require('./getCollection.js');

let collection;
getCollection().then(collectionInstance => collection = collectionInstance);


module.exports = (documentId, dataToUpdate) => {
	return new Promise((resolve, reject) => {
		collection.update({id: documentId}, {$set: dataToUpdate}, (err, result) => {

			if (err !== null) reject(err);
			else resolve();
		});
	});
};
