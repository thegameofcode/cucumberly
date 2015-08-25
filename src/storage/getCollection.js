'use strict';

const mongoClient = require('mongodb').MongoClient,
	config = require('../config.js');

const url = config.database.url;

module.exports = () => {
	return new Promise((resolve, reject) => {
		mongoClient.connect(url, (err, db) => {
			resolve(db.collection(config.database.collectionName));
		});
	})
};
