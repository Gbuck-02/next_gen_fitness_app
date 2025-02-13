const { getClientIdByUsername, addMeal } = require('../models/addMealModel');

const addMealController = (req, res) => {
  const { username } = req.query;
  let { food, calories, fat, carbs, protein, comments } = req.body; // Use let for reassignment

  if (!username || !food) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Convert empty or missing numeric values to 0
  calories = calories === "" || calories === undefined ? 0 : parseInt(calories); //parseInt to ensure number
  fat = fat === "" || fat === undefined ? 0 : parseFloat(fat); //parseFloat to ensure number
  carbs = carbs === "" || carbs === undefined ? 0 : parseFloat(carbs); //parseFloat to ensure number
  protein = protein === "" || protein === undefined ? 0 : parseFloat(protein); //parseFloat to ensure number

  getClientIdByUsername(username, (err, clientId) => {
    if (err) {
      return res.status(500).json(err);
    }

    addMeal(clientId, food, calories, fat, carbs, protein, comments, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).json(result);
    });
  });
};

module.exports = { addMealController };