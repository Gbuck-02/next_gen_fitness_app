const db = require('../db');  // Assuming you have a `db.js` for managing database connections

// Decline an invite by deleting the invite entry from the database
const declineInvite = (username, coach, callback) => {
  const query = `DELETE FROM coach_invites WHERE username = ? AND coach = ?`;
  
  db.query(query, [username, coach], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);  // Successfully deleted the invite
  });
};

module.exports = { declineInvite };