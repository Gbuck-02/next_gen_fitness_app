const db = require('../db'); //connect to db config file for credentials

//get user ID based on username
const getClientIdByUsername = (username, callback) => {
  const query = 'SELECT id FROM clients WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return callback({ error: 'Error fetching user ID: ' + err.message }, null);
    }
    if (results.length === 0) {
      return callback({ error: 'User not found' }, null);
    }
    callback(null, results[0].id); //return the user ID
  });
};

//function to add meal into database
const addMeal = (clientId, food, calories, fat, carbs, protein, comments, callback) => {
  const query = `
    INSERT INTO meal_statistics (client_id, meal_date, meal_time, food, calories, fat, carbs, protein, comments) 
    VALUES (?, CURRENT_DATE, CURRENT_TIME, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [clientId, food, calories, fat, carbs, protein, comments], (err, result) => {
    if (err) {
      return callback({ error: 'Error inserting meal: ' + err.message }, null);
    }
    callback(null, { success: true, mealId: result.insertId }); //return the inserted meal ID
  });
};

module.exports = { getClientIdByUsername, addMeal };