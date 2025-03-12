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
const getMealsRoutes = require('./routes/getmealsRoutes');
const editmealRoutes = require('./routes/editmealRoutes');
const getclientsRoutes = require('./routes/getclientsRoutes');
const getinvitesRoutes = require('./routes/getinvitesRoutes');

app.use('/api', loginRoutes);
app.use('/api', newuserRoutes);
app.use('/api', getstatsRoutes);
app.use('/api', addmealRoutes);
app.use('/api', getMealsRoutes);
app.use('/api', editmealRoutes);
app.use('/api', getclientsRoutes);
app.use('/api', getinvitesRoutes);

//fire up server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});