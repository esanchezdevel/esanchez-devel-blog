const bcrypt = require('bcrypt');
const dbConnection = require('./db-connection');
const { DB_NAME, DB_COLLECTION_USERS } = require('../utils/constants');

async function validateUser(username, password) {
    console.log(`Trying to validate user ${username}`);

    let validated = false;
    var client;

    try {
        client = await dbConnection.connect();

        const database = client.db(DB_NAME);
        const users = database.collection(DB_COLLECTION_USERS);

        const user = await users.findOne({username: username});

        if (user && await bcrypt.compare(password, user.password)) {
            console.log(`User ${username} validated`);
            validated = true;
        } else {
            console.log(`User ${username} not validated. Please, check the username and the password`);
        }
        return validated;
    } catch (error) {
        console.error('ERROR obtaining user from database:', error);
    } finally {
        await client.close();
    }
}

module.exports = { validateUser };