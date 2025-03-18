const express = require('express');
const router = express.Router();
const { addCoachInviteController } = require('../controllers/coachreqController');

router.post('/addCoachInvite', addCoachInviteController);

module.exports = router;