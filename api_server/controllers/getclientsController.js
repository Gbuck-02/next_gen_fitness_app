const { getclientsByCoach } = require('../models/getclientsModel');

//controller for getting the list of clients
const getclientsController = (req, res) => {
  const { coach } = req.query;

  if (!coach) {
    return res.status(400).json({ error: 'Coach username is required' });
  }

  //retrieve clients for the specified coach from the database
  getclientsByCoach(coach, (err, clients) => {
    if (err) {
      return res.status(500).json(err);
    }

    //return list of clients
    res.status(200).json({ clients });
  });
};

module.exports = { getclientsController };