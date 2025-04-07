const bcrypt = require('bcrypt'); //used to encrypt passwords
const { getUserByUsername } = require('../models/loginModel');

//controller for validating login credentials
const loginUser = (req, res) => {
  const { username, password } = req.body;

  //check if the username exists in the database
  getUserByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }
    if (!user) { 
      return res.status(404).json({ error: 'Invalid credentials' });
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