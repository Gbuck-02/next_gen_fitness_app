const { getClientIdByUsername, getMealStatsByDate } = require('../models/getstatsModel');

//controller for getting meal entries (used in home menu)
const getStatsForDate = (req, res) => {
  const { username, date } = req.query;

  getClientIdByUsername(username, (err, client) => {
    if (err) {
      console.error('Error fetching user ID:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (!client) {
      return res.status(404).json({ message: 'User not found' });
    }

    const clientId = client.id;

    //fetch all the meal entries for a specified user on a certain date
    getMealStatsByDate(clientId, date, (err, stats) => {
      if (err) {
        console.error('Error fetching meal stats:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (stats.length === 0) {
        return res.status(404).json({ message: 'No meal stats found for this date' });
      }

      //return the meal entries to the frontend
      return res.json(stats);
    });
  });
};

module.exports = { getStatsForDate };