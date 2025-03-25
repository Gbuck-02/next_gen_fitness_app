const express = require('express');
const router = express.Router();
const { newUser } = require('../controllers/newuseController');

//API route for creating a new user
router.post('/newuser', newUser);

module.exports = router;