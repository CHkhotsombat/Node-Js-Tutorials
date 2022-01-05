const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);
// Cross origin resource sharing
const whitelists = ['http://localhost:3500']
const corsOption = {
  origin: (origin, callback) => {
    if (whitelists.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
// build-in middleware for json
app.use(express.json());
// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));
// Error handler
app.use(errorHandler);
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

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