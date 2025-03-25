const express = require('express');
const router = express.Router();
const { declineInviteController } = require('../controllers/decreqController');

//API route for declining an invite
router.post('/decline-invite', declineInviteController);

module.exports = router;