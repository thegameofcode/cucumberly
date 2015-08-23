'use strict';

const mongoClient = require('mongodb').MongoClient,
    config = require('../config.js');

const url = config.MONGO_URL;

module.exports = filter => {
    return new Promise((resolve, reject) => {

        mongoClient.connect(url, (err, db) => {
            if(err) {
                return reject(Error(err));
            }

            const collection = db.collection(config.DB_COLLECTION_NAME);

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
