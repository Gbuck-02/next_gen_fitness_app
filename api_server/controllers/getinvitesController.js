const { getinvitesByCoach } = require('../models/getinvitesModel');  // Import the model

const getinvitesController = (req, res) => {
  const { coach } = req.query;  // Extract the coach username from query parameters

  if (!coach) {
    return res.status(400).json({ error: 'Coach username is required' });  // Return error if no coach username is provided
  }

  // Use the model function to fetch invites for the specified coach
  getinvitesByCoach(coach, (err, invites) => {
    if (err) {
      return res.status(500).json(err);  // Return the error in the response if any issue occurs
    }

    // If no invites, return a message saying no invites found
    if (invites.length === 0) {
      return res.status(404).json({ message: 'No invites found for this coach' });
    }

    // Return the list of invites in the response
    res.status(200).json({ invites });
  });
};

module.exports = { getinvitesController };
