const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOption = require('./config/coresOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// Cross origin resource sharing
app.use(cors(corsOption));

// build-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// build-in middleware for json
app.use(express.json());

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// Error handler
app.use(errorHandler);

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
}) 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));