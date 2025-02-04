const db = require('../db'); //import the shared db connection

//gets a user by username
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