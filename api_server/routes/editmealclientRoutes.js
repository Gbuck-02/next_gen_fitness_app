const express = require('express');
const router = express.Router();
const { editMealClient } = require('../controllers/editmealclientController');

//API route for editing a client's meal as a coach
router.put('/editMealClient', editMealClient);

module.exports = router;