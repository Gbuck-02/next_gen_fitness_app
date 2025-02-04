const db = require('../db'); // Import the shared db connection

// Function to add a new user to the database
const addUser = (username, pass, isCoach, callback) => {
  // SQL query to insert a new user
  const query = 'INSERT INTO clients (username, pass, isCoach) VALUES (?, ?, ?)';

  // Execute the query with the provided values
  db.query(query, [username, pass, isCoach], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);  // Log the error for debugging
      return callback(err);
    }
    // Return the result to the callback (you could also send the user ID or other info)
    callback(null, { message: 'User created successfully', userId: result.insertId });
  });
};

module.exports = { addUser };