const express = require('express');
const router = express.Router();
const { getMealStats } = require('../controllers/getmealsController.js');

//API route to get meal statistics based on username (used in adding a previous meal)
router.get('/getMeals', getMealStats);

module.exports = router;