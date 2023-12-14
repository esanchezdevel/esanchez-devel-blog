const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

async function connect() {
    try {
        const client = new MongoClient(config.mongoURI);

        await client.connect();

        return client;
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = { connect };