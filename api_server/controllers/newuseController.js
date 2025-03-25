const bcrypt = require('bcrypt'); //used to encrypt passwords
const { addUser } = require('../models/newuserModel');

//controller for adding a new user
const newUser = (req, res) => {
  const { username, pass, isCoach } = req.body;

  //use bcrypt to encrypt the password
  bcrypt.hash(pass, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Failed to hash password' });
    }

    //add new user in the database with encrypted password
    addUser(username, hashedPassword, isCoach, (err, result) => {
      if (err) {
        console.error("Database insert error:", err);
        return res.status(500).json({ error: 'Username already taken!' });
      }
      res.status(200).json({
        username: username,
        isCoach: isCoach,
      });
    });
  });
};

module.exports = { newUser };