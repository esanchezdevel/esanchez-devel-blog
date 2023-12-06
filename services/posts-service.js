const dbConnection = require('./db-connection');

const NUMBER_OF_POSTS = 5;

async function getLastPosts() {
    console.log(`getting last ${NUMBER_OF_POSTS} posts`);

    var client;

    try {
        client = await dbConnection.connect();

        const database = client.db('test');
        const posts = database.collection('posts');

        const cursor = posts.find().sort({date: -1}).limit(NUMBER_OF_POSTS);
        const data = await cursor.toArray();

        // add each config to the result array
        const result = [];
        const maxLength = 700;
        data.forEach(post => {
            const content = post.content.length > maxLength ? post.content.substring(0, maxLength) + '...' : post.content;
            post.content = content;
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

async function getPostById(postId) {
    console.log(`getting Post with id ${postId}`);

    var client;

    try {
        client = await dbConnection.connect();

        const database = client.db('test');
        const posts = database.collection('posts');

        const post = await posts.findOne({ post_id: parseFloat(postId) });

        console.log(`Post retrieved: ${post}`);

        return post;
    } catch (error) {
        console.error('ERROR obtaining post from database:', error);
        throw error;
    } finally {
        console.log(`closing connection in posts-service`);
        await client.close();
    }
}

module.exports = { getLastPosts, getPostById };