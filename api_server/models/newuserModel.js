const db = require('../db'); //connect to db config file for credentials

//function to add a new user to the database
const addUser = (username, pass, isCoach, callback) => {
  const query = 'INSERT INTO clients (username, pass, isCoach) VALUES (?, ?, ?)';

  db.query(query, [username, pass, isCoach], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return callback(err);
    }
    callback(null, { message: 'User created successfully', userId: result.insertId });
  });
};

module.exports = { addUser };