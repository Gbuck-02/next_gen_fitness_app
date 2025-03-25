const express = require('express');
const router = express.Router();
const { editMeal } = require('../controllers/editmealController');

//API route for editing a meal
router.put('/editMeal', editMeal);

module.exports = router;