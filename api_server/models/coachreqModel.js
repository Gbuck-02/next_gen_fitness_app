const db = require('../db'); //connect to db config file for credentials

//fetch a coach using the submitted coach code
const getCoachByCode = (coachCode, callback) => {
  const query = 'SELECT username FROM clients WHERE coach_code = ? AND isCoach = TRUE';
  db.query(query, [coachCode], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    return callback(null, results[0].username); //return the coach's username
  });
};

//add a new invite to the coach's inbox
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