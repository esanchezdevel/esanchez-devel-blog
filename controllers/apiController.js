const postsService = require('../services/posts-service');

const apiController = {
    saveComment: async (req, res) => {
        const jsonRequest = req.body;

        const postId = jsonRequest.postId;
        const email = jsonRequest.email;
        const name = jsonRequest.name;
        const content = jsonRequest.content;

        let statusCode;
        let message;
        try {
            const result = await postsService.saveComment(postId, email, name, content);
            if (result) {
                statusCode = 200;
                message = 'success';
            } else {
                statusCode = 500;
                message = 'Internal server error. Something happened while trying to save the comment';
            }

            res.json(await createJsonResponse(statusCode, message));
            res.status(statusCode);
        } catch (error) {
            console.error('Error rendering the view:', error);

            res.json(await createJsonResponse(500, 'Internal server error'));
            res.status(500);
        }
    }
};

async function createJsonResponse(statusCode, message) {
    return {
        code: statusCode,
        message: message
    };
}

module.exports = apiController;