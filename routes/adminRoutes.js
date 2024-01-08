const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.admin);
router.post('/login', adminController.login);
router.get('/post/new', adminController.postNew);
router.post('/post/new', adminController.savePost);
router.get('/post/edit/list', adminController.listAllPosts);

module.exports = router;