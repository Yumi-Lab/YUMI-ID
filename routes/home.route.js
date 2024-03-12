const express = require('express');
const router = express.Router();
const siteController = require('../controllers/home');

router.get('/', siteController.showDescription);

module.exports = router;