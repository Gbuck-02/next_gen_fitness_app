const db = require('../db'); // Import the database connection

// Function to get meal statistics by username
const getMealStatsByUsername = (username, callback) => {
  const query = `
    SELECT food, calories, fat, carbs, protein, comments, meal_date, meal_time
    FROM meal_statistics 
    WHERE client_id = (SELECT id FROM clients WHERE username = ?)
  `;
  
  db.query(query, [username], (err, results) => {
    if (err) {
      return callback({ error: 'Error fetching meal statistics: ' + err.message }, null);
    }
    callback(null, results); // Return the meal statistics
  });
};

module.exports = { getMealStatsByUsername };