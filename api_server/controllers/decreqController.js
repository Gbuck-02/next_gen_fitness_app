const { declineInvite } = require('../models/decreqModel');

//controller for declining the coach request
const declineInviteController = (req, res) => {
  const { username, coach } = req.body;

  //ensure both username and coach are provided
  if (!username || !coach) {
    return res.status(400).json({ error: 'Missing required fields: username and coach' });
  }

  //remove the invite from the coach's inbox
  declineInvite(username, coach, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json({
      success: true,
      message: 'Invite declined successfully',
      result,
    });
  });
};

module.exports = { declineInviteController };