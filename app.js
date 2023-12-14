const express = require('express');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const siteConfigurationService = require('./services/site-configuration-service');
const postsService = require('./services/posts-service');
const usersService = require('./services/users-service');
const config = require('./config');

const port = 4200;

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// configure express to serve files in "public" folder like .css or .js files
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ 
    secret: config.adminCookieSecret, 
    resave: true, 
    saveUninitialized: true, 
    cookie: {
        maxAge: 24* 60 * 60 * 1000 // The admin session expires in one day
    }
}));

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

// Admin pages

app.get('/admin', (req, res) => {
    console.log(`Admin page`);
    try {
        if (req.session.loggedin) {
            console.log(`User is already logged in.`);
            res.render('admin-index', {});
        } else {
            console.log(`User is not logged in`);
            res.render('admin-login');
        }
    } catch (error) {
        console.error('Error rendering the view: ', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/admin/login', async(req, res) => {

    console.log(`Accessing to Admin login page`);

    const { username, password } = req.body;

    try {
        const userValidated = await usersService.validateUser(username, password);

        if (userValidated) {
            console.log(`user is validated: ${userValidated}`)
            req.session.loggedin = true;
            req.session.username = username;
        } else {
            console.log(`user is not validated: ${userValidated}`)
        }
        res.redirect('/admin');
    } catch (error) {
        console.error('Error rendering the view: ', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});