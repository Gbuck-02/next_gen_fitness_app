const { getCoachByCode, addCoachInvite } = require('../models/coachreqModel');

//controller for handling a coach request sent from the user
const addCoachInviteController = (req, res) => {
  const { username, coachCode } = req.body;

  //ensure both username and coachCode are provided
  if (!username || !coachCode) {
    return res.status(400).json({ error: 'Missing required fields: username and coachCode' });
  }

  //look for a coach with the given coachCode
  getCoachByCode(coachCode, (err, coachUsername) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!coachUsername) {
      return res.status(404).json({ error: 'Coach not found for the given code' });
    }

    //if a coach is found, add the invite entry
  addCoachInvite(username, coachUsername, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.status(201).json({ success: true, message: 'Coach invite successfully created', result });
    });   
  });
};

module.exports = { addCoachInviteController };