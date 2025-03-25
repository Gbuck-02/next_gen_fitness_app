const db = require('../db'); //connect to db config file for credentials

//gets a username, password, thier coach status, and thier coach from the database
const getUserByUsername = (username, callback) => {
  const query = 'SELECT username, pass, isCoach, coach FROM clients WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    callback(null, results[0]); //returns username, password, thier coach status, and thier coach
  });
};

module.exports = { getUserByUsername };