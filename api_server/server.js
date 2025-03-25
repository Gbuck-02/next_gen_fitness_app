const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //parse incoming JSON requests from front end
const app = express(); //enable CORS for all routes (network traffic security errors)
app.use(cors());

//various routes
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

//having the API use the routes
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

//start API server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});