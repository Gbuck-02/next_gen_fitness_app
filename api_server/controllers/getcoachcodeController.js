const { getcoachCode } = require('../models/getcoachcodeModel');

//controller for getting the coach code
const getcoachcodeController = (req, res) => {
  const { coach } = req.query;

  if (!coach) {
    return res.status(400).json({ error: 'Coach username is required' });
  }

  //retrieve the coach code for the specified coach from the database
  getcoachCode(coach, (err, coachCode) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }

    //return the coach code
    res.status(200).json({ coachCode });
  });
};

module.exports = { getcoachcodeController };