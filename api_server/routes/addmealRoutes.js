const express = require('express');
const router = express.Router();
const { addMealController } = require('../controllers/addmealController');

//API route to add a meal
router.post('/addmeal', addMealController);

module.exports = router;