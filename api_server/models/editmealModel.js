const db = require('../db'); // Import the database connection

// Function to get client ID by username
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
    callback(null, results[0].id); // Return the client ID
  });
};

// Function to update the meal in the database
const updateMealInDatabase = (originalMeal, editedMeal, username, callback) => {
  // Get client ID based on username
  getClientIdByUsername(username, (err, clientId) => {
    if (err) {
      return callback(err, null);
    }

    const query = `
      UPDATE meal_statistics
      SET food = ?, calories = ?, fat = ?, carbs = ?, protein = ?, comments = ?, meal_date = ?
      WHERE food = ? AND calories = ? AND fat = ? AND carbs = ? AND protein = ? AND comments = ? AND meal_date = ? AND client_id = ?
    `;

    const values = [
      editedMeal.food,
      editedMeal.calories,
      editedMeal.fat,
      editedMeal.carbs,
      editedMeal.protein,
      editedMeal.comments,
      editedMeal.date,
      originalMeal.food,
      originalMeal.calories,
      originalMeal.fat,
      originalMeal.carbs,
      originalMeal.protein,
      originalMeal.comments,
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