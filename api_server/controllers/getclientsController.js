const { getclientsByCoach } = require('../models/getclientsModel'); // Import the model

const getclientsController = (req, res) => {
  const { coach } = req.query;  // Extract the coach username from query parameters

  if (!coach) {
    return res.status(400).json({ error: 'Coach username is required' });  // Return error if no coach username is provided
  }

  // Use the model function to fetch clients for the specified coach
  getclientsByCoach(coach, (err, clients) => {
    if (err) {
      return res.status(500).json(err);  // Return the error in the response if any issue occurs
    }

    // Return the list of clients in the response
    res.status(200).json({ clients });
  });
};

module.exports = { getclientsController };
