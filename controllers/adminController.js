const siteConfigurationService = require('../services/site-configuration-service');
const usersService = require('../services/users-service');
const postsService = require('../services/posts-service');

const adminController = {
    admin: async (req, res) => {
        console.log(`Admin page`);
        try {
            const siteConfiguration = await siteConfigurationService.getSiteConfiguration();

            if (req.session.loggedin) {
                console.log(`User is already logged in.`);
                res.render('admin-index', {siteConfiguration: siteConfiguration});
            } else {
                console.log(`User is not logged in`);
                res.render('admin-login', {siteConfiguration: siteConfiguration});
            }
        } catch (error) {
            console.error('Error rendering the view: ', error);
            res.status(500).send('Internal Server Error');
        }
    },

    login: async (req, res) => {
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
    }, 

    postNew: async (req, res) => {
        console.log(`New Post form page`);

        try {
            const siteConfiguration = await siteConfigurationService.getSiteConfiguration();

            if (req.session.loggedin) {
                res.render('admin-post-new', {siteConfiguration: siteConfiguration});
            } else {
                console.log(`User is not logged in`);
                res.render('admin-login', {siteConfiguration: siteConfiguration});
            }
        } catch (error) {
            console.error('Error rendering the view: ', error);
            res.status(500).send('Internal Server Error');
        }
    },

    savePost: async (req, res) => {
        console.log(`Saving new post in database`);

        const { title, description, content, category } = req.body;

        try {
            const result = await postsService.save(title, description, content, category);
            console.log(`Insert result: ${result}`);
            if (result) {
                res.redirect('/admin');
            } else {
                res.redirect('/admin/post/new');
            }
            
        } catch (error) {
            console.error('Error saving post in database: ', error);
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = adminController;