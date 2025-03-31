const db = require('../db'); //connect to db config file for credentials

//function to get meal statistics by username (used in the add previous meal)
const getMealStatsByUsername = (username, callback) => {
  const query = `
    SELECT food, calories, fat, carbs, protein, comments,
    DATE_FORMAT(meal_date, '%W, %M %d, %Y') AS formatted_date,
    DATE_FORMAT(meal_time, '%l:%i %p') AS formatted_time
    FROM meal_statistics 
    WHERE client_id = (SELECT id FROM clients WHERE username = ?)
  `;
  
  db.query(query, [username], (err, results) => {
    if (err) {
      return callback({ error: 'Error fetching meal statistics: ' + err.message }, null);
    }
    callback(null, results); //return the meal statistics
  });
};

module.exports = { getMealStatsByUsername };