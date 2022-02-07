require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOption = require('./config/coresOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross origin resource sharing
app.use(cors(corsOption));

// build-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// build-in middleware for json
app.use(express.json());

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// middleware for cookie
app.use(cookieParser());

// routes
app.use('/', require('./routes/root'));

// 404 response
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({
      error: '404 Not found'
    });
  } else {
    res.type('text').send('404 Not found');
  }
}); 

// Error handler
app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB.');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
