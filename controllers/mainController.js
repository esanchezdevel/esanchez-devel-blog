const siteConfigurationService = require('../services/site-configuration-service');
const postsService = require('../services/posts-service');

const mainController = {
    index: async (req, res) => {
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
    },

    getPost: async (req, res) => {
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
    }
};

module.exports = mainController;