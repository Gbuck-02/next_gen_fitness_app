const db = require('../db'); //connect to db config file for credentials

//function to get clients for a specified coach
const getclientsByCoach = (coachUsername, callback) => {
  const query = 'SELECT username FROM clients WHERE coach = ?';
  db.query(query, [coachUsername], (err, results) => {
    if (err) {
      return callback({ error: 'Error fetching clients: ' + err.message }, null);
    }
    if (results.length === 0) {
      return callback({ error: 'No clients found for this coach' }, null);
    }
    callback(null, results); //return the list of clients
  });
};

module.exports = { getclientsByCoach };