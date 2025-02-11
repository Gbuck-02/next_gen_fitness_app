const express = require('express');
const { getStatsForDate } = require('../controllers/getstatsController'); // Import controller

const router = express.Router();

// Define the route to get stats based on username and date
router.get('/getStats', getStatsForDate);  // Make sure this matches your frontend request

module.exports = router;
