const { acceptInvite } = require('../models/acceptreqModel');

//controller for accepting the invite
const acceptInviteController = (req, res) => {
  const { username, coach } = req.body;

  //make sure the username and coach is passed as query parameters
  if (!username || !coach) {
    return res.status(400).json({ error: 'Missing required fields: username and coach' });
  }

  //call the model function to accept the invite
  acceptInvite(username, coach, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({
      success: true,
      message: 'Invite accepted and coach assigned successfully',
      result,
    });
  });
};

module.exports = { acceptInviteController };