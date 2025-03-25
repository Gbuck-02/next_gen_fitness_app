const { updateMealInDatabase } = require('../models/editmealclientModel');

//controller for editing a client's meals
const editMealClient = (req, res) => {
    const { username } = req.query;
    const { originalMeal, editedMeal } = req.body;

    //edit the meal entry in the database
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

module.exports = { editMealClient };