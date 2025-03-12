const express = require('express');
const { getMealStats } = require('../controllers/getmealsController.js'); // Import controller

const router = express.Router();

// Define route to get meal statistics based on username
router.get('/getMeals', getMealStats);

module.exports = router;