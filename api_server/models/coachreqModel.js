const db = require('../db');

// Get coach by their coach code
const getCoachByCode = (coachCode, callback) => {
  const query = 'SELECT username FROM clients WHERE coach_code = ? AND isCoach = TRUE';
  db.query(query, [coachCode], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null); // No coach found
    }
    return callback(null, results[0].username); // Coach found, return the coach's username
  });
};

// Add a new invite to the coach_invites table
const addCoachInvite = (userUsername, coachUsername, callback) => {
  const query = 'INSERT INTO coach_invites (coach, username) VALUES (?, ?)';
  db.query(query, [coachUsername, userUsername], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

module.exports = { getCoachByCode, addCoachInvite };