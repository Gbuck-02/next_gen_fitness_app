const db = require('../db'); //connect to db config file for credentials

//accept an invite and assign the coach to the client
const acceptInvite = (username, coach, callback) => {
  const query = `UPDATE clients SET coach = ? WHERE username = ?`;
  const values = [coach, username];

  db.query(query, values, (err, result) => {
    if (err) {
      return callback(err, null);
    }

    //after accepting delete the invite from the database
    const deleteQuery = `DELETE FROM coach_invites WHERE username = ? AND coach = ?`;
    db.query(deleteQuery, [username, coach], (err, deleteResult) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, deleteResult);
    });
  });
};

module.exports = { acceptInvite };