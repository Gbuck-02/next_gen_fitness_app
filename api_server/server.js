const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // allows for the frontend to communicate with API
// import routes
const loginRoutes = require('./routes/loginRoutes');
const newuserRoutes = require('./routes/newuserRoutes');

const app = express();
const port = 3000;

// enable CORS for all routes 
app.use(cors());

// parse JSON data
app.use(bodyParser.json());

// using the routes
app.use('/api', loginRoutes);
app.use('/api', newuserRoutes)

// start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
