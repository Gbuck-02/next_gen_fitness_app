const express = require('express');
const router = express.Router();
const { getcoachcodeController } = require('../controllers/getcoachcodeController');

//API route to get the coach code for a specific coach
router.get('/coach-code', getcoachcodeController);

module.exports = router;