const bcrypt = require('bcrypt'); //used to encrypt passwords
const { getUserByUsername } = require('../models/loginModel');

//controller for validating log in credentials
const loginUser = (req, res) => {
  const { username, password } = req.body;

  //first checks if the username is in the database
  getUserByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }
    if (!user) { 
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    //then checks for passwords that match the username
    //special handling for Marcus and Anna with plaintext passwords (they are used for examples)
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

    //use bcrypt to compare passwords
    bcrypt.compare(password, user.pass, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }
      if (isMatch) {
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