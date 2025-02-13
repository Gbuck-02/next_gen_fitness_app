const express = require('express');
const { addMealController } = require('../controllers/addmealController');

const router = express.Router();

//define route to add a meal
router.post('/addmeal', addMealController);

module.exports = router;
