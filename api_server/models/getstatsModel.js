const db = require('../db'); //import the shared db connection

//function to get client ID by username
const getClientIdByUsername = async (username) => {
  try {
    const [rows] = await db.execute('SELECT id FROM clients WHERE username = ?', [username]);
    if (rows.length === 0) {
      return null; //no user found
    }
    return rows[0].id; // Return the client ID
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching client data');
  }
};

// Function to get meal statistics for a given client ID and date
const getMealStatsByClientIdAndDate = async (clientId, date) => {
  try {
    const [rows] = await db.execute(
      `SELECT 
        DATE_FORMAT(meal_date, '%W, %M %d, %Y') AS formatted_date,
        DATE_FORMAT(meal_time, '%l:%i %p') AS formatted_time, 
        food, calories, fat, carbs, protein, comments
      FROM meal_statistics 
      WHERE client_id = ? AND DATE(meal_date) = ? 
      ORDER BY meal_time DESC`, // Use DATE() to match only the date part
      [clientId, date] // Pass the clientId and date as parameters
    );
    return rows; // Return the meal stats for the client on the specified date
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching meal statistics');
  }
};

module.exports = { getClientIdByUsername, getMealStatsByClientIdAndDate };