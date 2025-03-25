const { getinvitesByCoach } = require('../models/getinvitesModel');

//controller for getting the current invites for a coach
const getinvitesController = (req, res) => {
  const { coach } = req.query;

  if (!coach) {
    return res.status(400).json({ error: 'Coach username is required' });
  }

  //fetch all invites for the specified coach
  getinvitesByCoach(coach, (err, invites) => {
    if (err) {
      return res.status(500).json(err);
    }

    //if no invites, return a message saying no invites found
    if (invites.length === 0) {
      return res.status(404).json({ message: 'No invites found for this coach' });
    }

    //return the list of invites
    res.status(200).json({ invites });
  });
};

module.exports = { getinvitesController };