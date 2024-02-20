const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const routes = require('./routes/index')
const PORT = process.env.PORT || 3001;
require('dotenv').config();
require('./config/config');


const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Allow only your React app's origin
  methods: ['GET', 'POST', 'DELETE', 'PATCH'], // Specify which HTTP methods are allowed
  credentials: true, // Allow cookies to be sent across domains
}));

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});