const express = require('express');
const router = express.Router();
const { getclientsController } = require('../controllers/getclientsController');

//API route to get clients for a specific coach
router.get('/clients', getclientsController);

module.exports = router;