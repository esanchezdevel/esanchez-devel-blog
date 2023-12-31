const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.admin);
router.post('/login', adminController.login);
router.get('/post/new', adminController.postNew);
router.post('/post/new', adminController.savePost);

module.exports = router;