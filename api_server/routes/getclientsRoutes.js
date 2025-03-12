const express = require('express');
const { getclientsController } = require('../controllers/getclientsController');

const router = express.Router();

// Define route to get clients for a specific coach
router.get('/clients', getclientsController);

module.exports = router;