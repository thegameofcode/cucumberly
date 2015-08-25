'use strict';

const mongoClient = require('mongodb').MongoClient,
    config = require('../config.js');

const url = config.database.url;

module.exports = dataToPersist => {
    return new Promise((resolve, reject) => {

        mongoClient.connect(url, (err, db) => {

            const collection = db.collection(config.database.collectionName);

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