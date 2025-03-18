const db = require('../db');  // Assuming you have a `db.js` for managing database connections

// Accept an invite and assign the coach to the client
const acceptInvite = (username, coach, callback) => {
  const query = `UPDATE clients SET coach = ? WHERE username = ?`;
  const values = [coach, username];

  db.query(query, values, (err, result) => {
    if (err) {
      return callback(err, null);
    }

    // After accepting, delete the invite from the database
    const deleteQuery = `DELETE FROM coach_invites WHERE username = ? AND coach = ?`;
    db.query(deleteQuery, [username, coach], (err, deleteResult) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, deleteResult); // Return the result after both actions
    });
  });
};

module.exports = { acceptInvite };