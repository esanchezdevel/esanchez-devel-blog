const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.use(express.json());

router.post('/comment/save', apiController.saveComment);

module.exports = router;