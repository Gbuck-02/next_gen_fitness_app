const db = require('../db'); //connect to db config file for credentials

//function to fetch invites for a specific coach
const getinvitesByCoach = (coachUsername, callback) => {
  const query = 'SELECT username FROM coach_invites WHERE coach = ?';

  db.query(query, [coachUsername], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    const invites = results.map(result => result.username);  //map results to an array of usernames
    callback(null, invites);  // return the list of invites
  });
};

module.exports = { getinvitesByCoach };