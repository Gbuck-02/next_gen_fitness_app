const mysql = require('mysql2');
require('dotenv').config();
const dbPassword = process.env.DB_PASSWORD;

//create connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: dbPassword,
  database: 'meal_tracker',
});

//connect to database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

//export the connection object to be used elsewhere
module.exports = db;