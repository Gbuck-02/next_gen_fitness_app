const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//enable CORS for all routes (network traffic security)
app.use(cors());

//parse incoming JSON requests from front end
app.use(bodyParser.json());

//various routes
const loginRoutes = require('./routes/loginRoutes');
const newuserRoutes = require('./routes/newuserRoutes');
const getstatsRoutes = require('./routes/getstatsRoutes');
const addmealRoutes = require('./routes/addmealRoutes');
const getMealsRoutes = require('./routes/getmealsRoutes'); // Import your new routes
app.use('/api', loginRoutes);
app.use('/api', newuserRoutes);
app.use('/api', getstatsRoutes);
app.use('/api', addmealRoutes);
app.use('/api', getMealsRoutes); // Use the routes under the /api path

//fire up server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});