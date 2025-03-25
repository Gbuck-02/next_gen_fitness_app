const db = require('../db');//connect to db config file for credentials

//function to get client ID by username, verify they are in database
const getClientIdByUsername = (username, callback) => {
  const query = `
    SELECT id FROM clients WHERE username = ?
  `;

  db.query(query, [username], (err, results) => {
    if (err) {
      return callback({ error: 'Error fetching client ID: ' + err.message }, null);
    }
    if (results.length === 0) {
      return callback({ error: 'Client not found' }, null);
    }
    callback(null, results[0].id); //return the client ID
  });
};

//function to update the meal in the database for the specified user
const updateMealInDatabase = (originalMeal, editedMeal, username, callback) => {
  getClientIdByUsername(username, (err, clientId) => {
    if (err) {
      return callback(err, null);
    }

    const query = `
      UPDATE meal_statistics
      SET food = ?, calories = ?, fat = ?, carbs = ?, protein = ?, meal_date = ?, coach_comment = ?
      WHERE food = ? AND calories = ? AND fat = ? AND carbs = ? AND protein = ? AND meal_date = ? AND client_id = ?
    `;

    const values = [
      editedMeal.food,
      editedMeal.calories,
      editedMeal.fat,
      editedMeal.carbs,
      editedMeal.protein,
      editedMeal.date,
      editedMeal.coach_comments,

      originalMeal.food,
      originalMeal.calories,
      originalMeal.fat,
      originalMeal.carbs,
      originalMeal.protein,
      originalMeal.date,
      clientId
    ];

    db.query(query, values, (err, results) => {
      if (err) {
        return callback({ error: 'Error updating the meal: ' + err.message }, null);
      }
      callback(null, results);
    });
  });
};

module.exports = { updateMealInDatabase };