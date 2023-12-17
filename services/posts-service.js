const dbConnection = require('./db-connection');
const { DB_NAME, DB_COLLECTION_POSTS } = require('../utils/constants');

const NUMBER_OF_POSTS = 5;

async function getLastPosts() {
    console.log(`getting last ${NUMBER_OF_POSTS} posts`);

    var client;

    try {
        client = await dbConnection.connect();

        const database = client.db(DB_NAME);
        const posts = database.collection(DB_COLLECTION_POSTS);

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
        await client.close();
    }
}

async function getPostById(postId) {
    console.log(`getting Post with id ${postId}`);

    var client;

    try {
        client = await dbConnection.connect();

        const database = client.db(DB_NAME);
        const posts = database.collection(DB_COLLECTION_POSTS);

        const post = await posts.findOne({ post_id: parseFloat(postId) });

        post.content = await parseContent(post.content);

        return post;
    } catch (error) {
        console.error('ERROR obtaining post from database:', error);
    } finally {
        await client.close();
    }
}

async function save(title, content, category) {
    console.log(`Saving new post in database`);

    var client;

    try {
        client = await dbConnection.connect();

        const database = client.db(DB_NAME);
        const posts = database.collection(DB_COLLECTION_POSTS);

        const lastPost = await posts.findOne({}, { sort: { post_id: -1 } });

        const newPost = {
            title: title, 
            content: content, 
            category: category,
            post_id: lastPost ? lastPost.post_id + 1 : 1,
            date: new Date(Date.now())
        };

        const result = await posts.insertOne(newPost);
        
        if (result.insertedId) {
            console.log(`Post inserted: ${result.insertedId}`);
            return true;
        } else {
            console.log(`Post NOT inserted. Please check it`);
            return false;
        }
    } catch (error) {
        console.error('Error saving post in database: ', error);
    } finally {
        await client.close();
    }
}

async function parseContent(content) {
    let result = content.replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\r\n/g, '<br>')

    // letters
    .replace(/á/g, '&aacute;')
    .replace(/é/g, '&eacute;')
    .replace(/í/g, '&iacute;')
    .replace(/ó/g, '&oacute;')
    .replace(/ú/g, '&uacute;')
    .replace(/Á/g, '&Aacute;')
    .replace(/É/g, '&Eacute;')
    .replace(/Í/g, '&Iacute;')
    .replace(/Ó/g, '&Oacute;')
    .replace(/Ú/g, '&Uacute;')
    .replace(/ñ/g, '&ntilde;')
    .replace(/Ñ/g, '&Ntilde;')

    // html tags
    .replace(/\[b\]/g, '<b>')
    .replace(/\[\/b\]/g, '</b>')
    .replace(/\[i\]/g, '<i>')
    .replace(/\[\/i\]/g, '</i>')
    .replace(/\[color=red\]/g, '<span style="color: red;">')
    .replace(/\[\/color\]/g, '</span>')
    .replace(/\[img="/g, '<img class="post-image" src="')
    .replace(/"\]/g, '">')
    .replace(/\[code=java\]/g, '<pre><code class="language-java">')
    .replace(/\[code=css\]/g, '<pre><code class="language-css">')
    .replace(/\[code=html\]/g, '<pre><code class="language-markup">')
    .replace(/\[code=javascript\]/g, '<pre><code class="language-javascript">')
    .replace(/\[\/code\]/g, '</code></pre>');

    result = result.replace(/<code class="language-java">(.*?)<\/code>/gs, (match, group) => {
        const replaced = group.replace(/<br>/g, '\r\n');
        return `<code class="language-java">${replaced}</code>`;
    });

    result = result.replace(/<code class="language-css">(.*?)<\/code>/gs, (match, group) => {
        const replaced = group.replace(/<br>/g, '\r\n');
        return `<code class="language-css">${replaced}</code>`;
    });

    result = result.replace(/<code class="language-markup">(.*?)<\/code>/gs, (match, group) => {
        const replaced = group.replace(/<br>/g, '\r\n');
        return `<code class="language-markup">${replaced}</code>`;
    });

    result = result.replace(/<code class="language-javascript">(.*?)<\/code>/gs, (match, group) => {
        const replaced = group.replace(/<br>/g, '\r\n');
        return `<code class="language-java">${replaced}</code>`;
    });

    return result;
}

module.exports = { getLastPosts, getPostById, save };