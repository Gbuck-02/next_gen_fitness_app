const express = require('express');
const router = express.Router();
const { editMeal } = require('../controllers/editmealController');

router.put('/editMeal', editMeal);

module.exports = router;