const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginController');

//API route for validating user credentials
router.post('/login', loginUser);

module.exports = router;