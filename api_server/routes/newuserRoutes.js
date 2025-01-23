const express = require('express');
const { newUser } = require('../controllers/newuseController'); // import controller

const router = express.Router();

// define the new user route
router.post('/newuser', newUser);

module.exports = router;