'use strict';

const getCollection = require('./getCollection.js');

let collection;
getCollection().then(collectionInstance => collection = collectionInstance);


module.exports = (filter, updateOperator) => {
	return new Promise((resolve, reject) => {
		collection.update(filter, updateOperator, (err, result) => {
			if (err !== null) reject(err);
			else resolve();
		});
	});
};
