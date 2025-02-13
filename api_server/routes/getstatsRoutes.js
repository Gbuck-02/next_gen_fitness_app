const express = require('express');
const { getStatsForDate } = require('../controllers/getstatsController'); //import controller

const router = express.Router();

//define route to get stats based on username and date
router.get('/getStats', getStatsForDate);

module.exports = router;
