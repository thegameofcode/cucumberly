'use strict';

const mongoClient = require('mongodb').MongoClient,
    config = require('../config.js');

const url = config.MONGO_URL;

module.exports = dataToPersist => {
    return new Promise((resolve, reject) => {

        mongoClient.connect(url, (err, db) => {

            const collection = db.collection(config.DB_COLLECTION_NAME);

            collection.insertOne(dataToPersist, err => {
                if (err !== null) {
                    reject(Error(err));
                } else {
                    resolve();
                }
                db.close();
            });
        });
    });
};