const db = require('../db'); // Import the database connection

// Function to get clients by coach username
const getclientsByCoach = (coachUsername, callback) => {
  const query = 'SELECT username FROM clients WHERE coach = ?'; // Adjust the query as necessary
  db.query(query, [coachUsername], (err, results) => {
    if (err) {
      return callback({ error: 'Error fetching clients: ' + err.message }, null);
    }
    if (results.length === 0) {
      return callback({ error: 'No clients found for this coach' }, null); // Return an error if no clients found
    }
    callback(null, results); // Return the list of clients
  });
};

module.exports = { getclientsByCoach };