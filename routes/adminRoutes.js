const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.admin);
router.post('/login', adminController.login);

module.exports = router;