const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/post/category/:category', mainController.getPostsByCategory);
router.get('/post/:postId', mainController.getPost);
router.get('/post', mainController.getAllPosts);

module.exports = router;