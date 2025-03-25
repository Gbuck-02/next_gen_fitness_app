const bcrypt = require('bcrypt'); // Import bcrypt
const { addUser } = require('../models/newuserModel'); // Import the model

const newUser = (req, res) => {
  const { username, pass, isCoach } = req.body;

  // Use bcrypt to hash the password
  bcrypt.hash(pass, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Failed to hash password' });
    }

    // Call the model to insert the new user with the hashed password
    addUser(username, hashedPassword, isCoach, (err, result) => {
      if (err) {
        console.error("Database insert error:", err);
        return res.status(500).json({ error: 'Username already taken!' });
      }

      // If insertion is successful, return the user data back to the frontend
      res.status(200).json({
        username: username,
        isCoach: isCoach,
      });
    });
  });
};

module.exports = { newUser };