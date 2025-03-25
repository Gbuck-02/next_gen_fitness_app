const express = require('express');
const router = express.Router();
const { addCoachInviteController } = require('../controllers/coachreqController');

//API route to create a coach invite request
router.post('/addCoachInvite', addCoachInviteController);

module.exports = router;