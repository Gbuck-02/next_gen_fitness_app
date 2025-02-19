const { getMealStatsByUsername } = require('../models/getmealsModel'); // Import model

const getMealStats = (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  getMealStatsByUsername(username, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No meal statistics found for this user' });
    }

    res.status(200).json(results); // Return the meal statistics
  });
};

module.exports = { getMealStats };