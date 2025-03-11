const { updateMealInDatabase } = require('../models/editmealModel'); // Import the model

// Controller function to handle editing meals
const editMeal = (req, res) => {
    const { username } = req.query;
    const { originalMeal, editedMeal } = req.body;

    // Call the model function to update the meal
    updateMealInDatabase(originalMeal, editedMeal, username, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'No meal found to update' });
        }

        res.status(200).json({ message: 'Meal updated successfully!', results });
    });
};

module.exports = { editMeal };