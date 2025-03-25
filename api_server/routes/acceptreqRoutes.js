const express = require('express');
const router = express.Router();
const { acceptInviteController } = require('../controllers/acceptreqController');

//API route for accepting an invite
router.post('/accept-invite', acceptInviteController);

module.exports = router;