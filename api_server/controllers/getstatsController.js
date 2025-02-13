const { getClientIdByUsername, getMealStatsByDate } = require('../models/getstatsModel');

const getStatsForDate = (req, res) => {
  const { username, date } = req.query;

  //get client ID using the username
  getClientIdByUsername(username, (err, client) => {
    if (err) {
      console.error('Error fetching user ID:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (!client) {
      return res.status(404).json({ message: 'User not found' });
    }

    //get meal stats using the client ID and date
    const clientId = client.id;

    getMealStatsByDate(clientId, date, (err, stats) => {
      if (err) {
        console.error('Error fetching meal stats:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (stats.length === 0) {
        return res.status(404).json({ message: 'No meal stats found for this date' });
      }

      //return the meal stats to the frontend
      return res.json(stats);
    });
  });
};

module.exports = { getStatsForDate };