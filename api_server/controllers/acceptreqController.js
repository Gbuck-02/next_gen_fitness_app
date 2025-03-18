const { acceptInvite } = require('../models/acceptreqModel');

// Controller for accepting the invite
const acceptInviteController = (req, res) => {
  const { username, coach } = req.body;

  // Ensure both username and coach are provided
  if (!username || !coach) {
    return res.status(400).json({ error: 'Missing required fields: username and coach' });
  }

  // Call the model function to accept the invite
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