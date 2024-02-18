const mongoose = require('mongoose');

// Replace the following with your Atlas connection string
const dbURI = "your_mongodb_atlas_connection_string_here";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Connection error', err));