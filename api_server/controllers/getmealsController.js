const { getMealStatsByUsername } = require('../models/getmealsModel');

//controller for getting all previous meal entries (used in the add previous meal)
const getMealStats = (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  //fetches all meal entries for a specified user
  getMealStatsByUsername(username, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No meal statistics found for this user' });
    }

    // Return the meal entries
    res.status(200).json(results);
  });
};

module.exports = { getMealStats };