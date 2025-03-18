const { getCoachByCode, addCoachInvite } = require('../models/coachreqModel');

const addCoachInviteController = (req, res) => {
  const { username, coachCode } = req.body;

  // Ensure both username and coachCode are provided
  if (!username || !coachCode) {
    return res.status(400).json({ error: 'Missing required fields: username and coachCode' });
  }

  // Look for a coach with the given coachCode
  getCoachByCode(coachCode, (err, coachUsername) => {
    if (err) {
      return res.status(500).json(err); // Server error, something went wrong with the database query
    }
    if (!coachUsername) {
      return res.status(404).json({ error: 'Coach not found for the given code' });
    }

    // If a coach is found, add the invite entry
  addCoachInvite(username, coachUsername, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message }); // Include a success flag and error message
    }
    // Successfully created the invite
    res.status(201).json({ success: true, message: 'Coach invite successfully created', result });
    });   
  });
};

module.exports = { addCoachInviteController };
