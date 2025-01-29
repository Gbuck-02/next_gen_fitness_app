const mysql = require('mysql2');
require('dotenv').config();

// Set up the database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD, // Ensure this is correctly set in your .env file
  database: 'meal_tracker', // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

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