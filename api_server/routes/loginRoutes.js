const express = require('express');
const { loginUser } = require('../controllers/loginController'); // import controller

const router = express.Router();

// define the login route
router.post('/login', loginUser);

module.exports = router;