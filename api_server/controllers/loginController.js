const bcrypt = require('bcrypt'); //npm install to hash passwords
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

    // special handling for Marcus and Anna with plaintext passwords
    if (username === 'Marcus' || username === 'Anna') {
      if (user.pass === password) {
        return res.json({
          username: user.username,
          isCoach: Boolean(user.isCoach),
          coach: user.coach,
        });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    }

    // use bcrypt to compare passwords
    bcrypt.compare(password, user.pass, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }
      if (isMatch) {
        // return user data for frontend
        return res.json({
          username: user.username,
          isCoach: Boolean(user.isCoach),
          coach: user.coach,
        });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });
};

module.exports = { loginUser };