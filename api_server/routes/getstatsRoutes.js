const express = require('express');
const router = express.Router();
const { getStatsForDate } = require('../controllers/getstatsController');

//API route to get stats based on username and date (used in home menu)
router.get('/getStats', getStatsForDate);

module.exports = router;