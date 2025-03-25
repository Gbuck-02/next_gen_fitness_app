const { getClientIdByUsername, addMeal } = require('../models/addMealModel');

//controller for adding the meal
const addMealController = (req, res) => {
  const { username } = req.query;
  let { food, calories, fat, carbs, protein, comments } = req.body;

  if (!username || !food) {
    return res.status(400).json({ error: 'Must enter a food eaten!' });
  }

  //convert empty or missing numeric values to 0, ensure each are a number value
  calories = calories === "" || calories === undefined ? 0 : parseInt(calories);
  fat = fat === "" || fat === undefined ? 0 : parseFloat(fat);
  carbs = carbs === "" || carbs === undefined ? 0 : parseFloat(carbs);
  protein = protein === "" || protein === undefined ? 0 : parseFloat(protein);

  //retrieve client id from db and enter new meal
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