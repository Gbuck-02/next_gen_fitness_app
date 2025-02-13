const db = require('../db'); // Import the database connection

// Function to get user ID by username
const getClientIdByUsername = (username, callback) => {
  const query = 'SELECT id FROM clients WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return callback({ error: 'Error fetching user ID: ' + err.message }, null);
    }
    if (results.length === 0) {
      return callback({ error: 'User not found' }, null); // Return an error if user is not found
    }
    callback(null, results[0].id); // Return the user ID
  });
};

// Function to add meal
const addMeal = (clientId, food, calories, fat, carbs, protein, comments, callback) => {
  const query = `
    INSERT INTO meal_statistics (client_id, meal_date, meal_time, food, calories, fat, carbs, protein, comments) 
    VALUES (?, CURRENT_DATE, CURRENT_TIME, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [clientId, food, calories, fat, carbs, protein, comments], (err, result) => {
    if (err) {
      return callback({ error: 'Error inserting meal: ' + err.message }, null);
    }
    callback(null, { success: true, mealId: result.insertId }); // Return the inserted meal ID
  });
};

module.exports = { getClientIdByUsername, addMeal };