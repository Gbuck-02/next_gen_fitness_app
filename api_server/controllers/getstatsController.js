// controllers/getstatsController.js
const { getClientIdByUsername, getMealStatsByClientIdAndDate } = require('../models/getstatsModel');

const getClientId = async (req, res) => {
  const { username, date } = req.query; // Get the username and date from query parameters

  if (!username || !date) {
    return res.status(400).json({ message: 'Username and date are required' });
  }

  try {
    // Step 1: Get client ID by username
    const clientId = await getClientIdByUsername(username);
    if (!clientId) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Step 2: Get meal statistics for the client ID on the specified date
    const mealStats = await getMealStatsByClientIdAndDate(clientId, date);
    if (!mealStats || mealStats.length === 0) {
      return res.status(404).json({ message: 'No meal statistics found for this client on the specified date' });
    }

    // Step 3: Return the meal statistics
    return res.json({ clientId, mealStats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getClientId };