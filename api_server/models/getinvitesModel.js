const db = require('../db');  // Import the database connection

// Function to fetch invites for a specific coach using the callback approach
const getinvitesByCoach = (coachUsername, callback) => {
  const query = 'SELECT username FROM coach_invites WHERE coach = ?';  // Query to fetch usernames where the coach is equal to the current user

  db.query(query, [coachUsername], (err, results) => {
    if (err) {
      return callback(err, null);  // Pass error to callback if it occurs
    }

    const invites = results.map(result => result.username);  // Map results to an array of usernames
    callback(null, invites);  // Pass the invites to the callback
  });
};

module.exports = { getinvitesByCoach };