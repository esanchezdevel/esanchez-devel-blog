const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const app = express();
const siteConfigurationService = require('./services/site-configuration-service');
const postsService = require('./services/posts-service');

const port = 4200;

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// configure express to serve files in "public" folder like .css or .js files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {

    try {
        const siteConfiguration = await siteConfigurationService.getSiteConfiguration();
        const posts = await postsService.getLastPosts();
        res.render('index', {
            siteConfiguration: siteConfiguration,
            posts: posts
        });
    } catch (error) {
        console.error('Error rendering the view:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/post/:postId', async (req, res) => {

    console.log(`post received: ${req.params.postId}`);

    try {
        const siteConfiguration = await siteConfigurationService.getSiteConfiguration();
        const post = await postsService.getPostById(req.params.postId);
        res.render('post', {
            siteConfiguration: siteConfiguration,
            post: post
        });
    } catch (error) {
        console.error('Error rendering the view:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});