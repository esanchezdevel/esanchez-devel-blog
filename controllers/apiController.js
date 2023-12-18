const postsService = require('../services/posts-service');

const apiController = {
    saveComment: async (req, res) => {
        const jsonRequest = req.body;

        const postId = jsonRequest.postId;
        const email = jsonRequest.email;
        const content = jsonRequest.content;

        console.log(`saving comment - postId: ${postId}, email: ${email}, content: ${content}`);

        try {
            const result = await postsService.saveComment(postId, email, content);
            if (result) {
                const result = {
                    code: 200,
                    message: 'success'
                }

                res.json(result);
                res.status(200);
            } else {
                const result = {
                    code: 500,
                    message: 'Internal server error'
                }
                res.json(result);
                res.status(500);
            }
        } catch (error) {
            console.error('Error rendering the view:', error);
            const result = {
                code: 500,
                message: 'Internal server error'
            }
            res.json(result);
            res.status(500);
        }
    }
};

module.exports = apiController;