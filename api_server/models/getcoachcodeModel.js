const db = require('../db'); //connect to DB config file for credentials

//function to get the coach code for a specified coach
const getcoachCode = (coachUsername, callback) => {
  const query = 'SELECT coach_code FROM clients WHERE username = ?';
  db.query(query, [coachUsername], (err, results) => {
    if (err) {
      return callback({ error: 'Error fetching coach code: ' + err.message }, null);
    }
    if (results.length === 0) {
      return callback({ error: 'Coach not found' }, null);
    }
    callback(null, results[0].coach_code); //return the coach code
  });
};

module.exports = { getcoachCode };