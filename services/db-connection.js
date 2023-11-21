const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

async function connect() {
    try {
        console.log('connecting to ' + config.mongoURI);

        const client = new MongoClient(config.mongoURI);

        await client.connect();
    
        console.log(`MongoDB connected`);

        return client;
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = { connect };