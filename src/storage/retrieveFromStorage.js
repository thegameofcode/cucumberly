'use strict';

const mongoClient = require('mongodb').MongoClient,
    config = require('../config.js');

const url = config.database.url;

module.exports = filter => {
    return new Promise((resolve, reject) => {

        mongoClient.connect(url, (err, db) => {
            if(err) {
                return reject(Error(err));
            }

            const collection = db.collection(config.database.collectionName);

            collection.find(filter).toArray((err, retrievedDocs) => {
                if (err !== null) {
                    reject(Error(err));
                } else {
                    resolve(retrievedDocs);
                }
                db.close();
            });
        });
    });
};
