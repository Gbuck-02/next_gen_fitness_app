const { getUserByUsername } = require('../models/loginModel'); // import model

const loginUser = (req, res) => {
  const { username, password } = req.body;

  // get user from database by username
  getUserByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // direct password comparison (needs to change to compare hashes)
    if (user.pass === password) {
      // if correct password return user data
      return res.json({
        username: user.username,
        isCoach: user.isCoach,
        Coach: user.Coach,
      });
    } else {
      // incorrect password
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
};

module.exports = { loginUser };