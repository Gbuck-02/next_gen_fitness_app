const db = require('../db'); //connect to db config file for credentials

//decline an invite by deleting the invite entry from the database
const declineInvite = (username, coach, callback) => {
  const query = `DELETE FROM coach_invites WHERE username = ? AND coach = ?`;
  
  db.query(query, [username, coach], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

module.exports = { declineInvite };