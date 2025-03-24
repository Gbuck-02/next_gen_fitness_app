const express = require('express');
const router = express.Router();
const { editMealClient } = require('../controllers/editmealclientController');

router.put('/editMealClient', editMealClient);

module.exports = router;