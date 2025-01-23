const { getUsername } = require('../models/newuserModel'); // import model

const newUser = (req, res) => {
  const { username } = req.body;

  // Check if the username already exists in the database
  getUsername(username, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }
    if (result === 1) {
      // If the username already exists in the database
      return res.status(400).json({ error: 'Username already taken' });
    }
    // further logic like user creation or other tasks here (if needed)
  });
};

module.exports = { newUser };