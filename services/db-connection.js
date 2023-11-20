const mongoose = require('mongoose');
const config = require('../config');

async function connect() {
    try {
        console.log('connecting to ' + config.mongoURI);

        const conn = await mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

async function close() {
    await mongoose.connection.close();
}

module.exports = { connect, close };