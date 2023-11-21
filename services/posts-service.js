const dbConnection = require('./db-connection');

const NUMBER_OF_POSTS = 5;

async function getLastPosts() {
    console.log(`getting last ${NUMBER_OF_POSTS} posts`);

    var client;

    try {
        client = await dbConnection.connect();

        const database = client.db('test');
        const posts = database.collection('posts');

        const cursor = posts.find(); //TODO get only the last posts.
        const data = await cursor.toArray();

        // add each config to the result array
        const result = [];
        data.forEach(post => {
            result.push(post);
        });
        return result;
    } catch (error) {
        console.error('ERROR obtaining posts from database:', error);
        throw error;
    } finally {
        console.log(`closing connection in posts-service`);
        await client.close();
    }
}

module.exports = { getLastPosts };