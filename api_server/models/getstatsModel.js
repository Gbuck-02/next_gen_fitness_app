const db = require('../db'); //import the db connection

//function to get user ID by username
const getClientIdByUsername = (username, callback) => {
  const query = 'SELECT id FROM clients WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return callback('Error fetching user ID: ' + err.message);
    }
    if (results.length === 0) {
      return callback(null, null); //user not found
    }
    callback(null, results[0]); //return first matching user
  });
};

//function to get meal stats by client ID and date
const getMealStatsByDate = (clientId, date, callback) => {
  const query = `SELECT 
                    DATE_FORMAT(meal_date, '%W, %M %d, %Y') AS formatted_date,
                    DATE_FORMAT(meal_time, '%l:%i %p') AS formatted_time, 
                    food, calories, fat, carbs, protein, comments
                 FROM meal_statistics 
                 WHERE client_id = ? AND DATE(meal_date) = ?`;

  db.query(query, [clientId, date], (err, rows) => {
    if (err) {
      return callback('Error fetching meal stats: ' + err.message);
    }
    if (!rows || rows.length === 0) {
      return callback(null, []); //no stats found
    }
    callback(null, rows); //return meal stats
  });
};

module.exports = { getClientIdByUsername, getMealStatsByDate };