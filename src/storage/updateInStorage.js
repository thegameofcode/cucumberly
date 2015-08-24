'use strict';

const mongoClient = require('mongodb').MongoClient,
	config = require('../config.js');

const url = config.MONGO_URL;


module.exports = (documentId, dataToUpdate) => {
	return new Promise((resolve, reject) => {
		mongoClient.connect(url, (err, db) => {

			const collection = db.collection(config.DB_COLLECTION_NAME);
			collection.update({id: documentId}, {$set: dataToUpdate}, (err, result) => {

				if (err !== null) reject(err);
				else resolve();
			});
		});
	});
};
