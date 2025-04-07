const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express(); //app initialization

app.use(bodyParser.json());
app.use(cors()); //enable CORS for all routes (avoid security issues)

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
app.use('/api', getcoachcodeRoutes);

//host API server on localhost
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});