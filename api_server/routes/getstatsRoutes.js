const express = require('express');
const { getClientId } = require('../controllers/getstatsController');

const router = express.Router();

router.get('/getID', getClientId);

module.exports = router;

