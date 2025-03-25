const express = require('express');
const router = express.Router();
const { getinvitesController } = require('../controllers/getinvitesController');

//API route to fetch invites for the current coach
router.get('/invites', getinvitesController);

module.exports = router;