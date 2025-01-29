const mysql = require('mysql2');
require('dotenv').config();
const dbPassword = process.env.DB_PASSWORD;
console.log("here")
 
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
const getUserByUsername = (username, callback) => {
  const query = 'SELECT username, pass, isCoach, coach FROM clients WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length === 0) {
      return callback(null, null); // user not in db
    }
    callback(null, results[0]); // return first matching user
  });
};

module.exports = { getUserByUsername };