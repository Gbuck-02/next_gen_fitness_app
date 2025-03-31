const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // Initialize app first

app.use(bodyParser.json()); // Middleware to parse JSON
app.use(cors()); // Enable CORS for all routes

// Various routes
const loginRoutes = require('./routes/loginRoutes');
const newuserRoutes = require('./routes/newuserRoutes');
const getstatsRoutes = require('./routes/getstatsRoutes');
const addmealRoutes = require('./routes/addmealRoutes');
const getMealsRoutes = require('./routes/getmealsRoutes');
const editmealRoutes = require('./routes/editmealRoutes');
const getclientsRoutes = require('./routes/getclientsRoutes');
const getinvitesRoutes = require('./routes/getinvitesRoutes');
const coachreqRoutes = require('./routes/coachreqRoutes');
const acceptreqRoutes = require('./routes/acceptreqRoutes');
const decreqRoutes = require('./routes/decreqRoutes');
const editmealclientRoutes = require('./routes/editmealclientRoutes');
const getcoachcodeRoutes = require('./routes/getcoachcodeRoutes');

// Having the API use the routes
app.use('/api', loginRoutes);
app.use('/api', newuserRoutes);
app.use('/api', getstatsRoutes);
app.use('/api', addmealRoutes);
app.use('/api', getMealsRoutes);
app.use('/api', editmealRoutes);
app.use('/api', getclientsRoutes);
app.use('/api', getinvitesRoutes);
app.use('/api', coachreqRoutes);
app.use('/api', acceptreqRoutes);
app.use('/api', decreqRoutes);
app.use('/api', editmealclientRoutes);
app.use('/api', getcoachcodeRoutes);

// Start API server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});