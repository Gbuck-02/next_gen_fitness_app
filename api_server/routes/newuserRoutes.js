const express = require('express');
const { newUser } = require('../controllers/newuseController'); // import controller

const router = express.Router();

// Define the new user route
router.post('/newuser', newUser);

module.exports = router;
