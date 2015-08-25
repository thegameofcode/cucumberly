'use strict';

const mongoClient = require('mongodb').MongoClient,
	config = require('../config.js');

const url = config.database.url;


module.exports = (documentId, dataToUpdate) => {
	return new Promise((resolve, reject) => {
		mongoClient.connect(url, (err, db) => {

			const collection = db.collection(config.database.collectionName);
			collection.update({id: documentId}, {$set: dataToUpdate}, (err, result) => {

				if (err !== null) reject(err);
				else resolve();
			});
		});
	});
};
