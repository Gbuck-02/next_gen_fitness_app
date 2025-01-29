const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// enable CORS for all routes (network traffic security)
app.use(cors());

// parse incoming JSON requests from front end
app.use(bodyParser.json());

// various routes
const loginRoutes = require('./routes/loginRoutes');
const newuserRoutes = require('./routes/newuserRoutes');
app.use('/api', loginRoutes);
app.use('/api', newuserRoutes);

// fire up server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

