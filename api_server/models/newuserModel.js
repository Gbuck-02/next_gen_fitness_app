const mysql = require('mysql2');
require('dotenv').config();
const dbPassword = process.env.DB_PASSWORD;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: dbPassword,
  database: 'meal_tracker',
});

// connect to database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// gets a user by username
const getUsername = (username, callback) => {
  const query = 'SELECT username FROM clients WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length > 0) {
      return callback(null, 1);  // username already exists
    }
    callback(null, 0);  // username is available (no issues found)
  });
  
};

module.exports = { getUsername };