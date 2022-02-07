const { logEvents } = require("./logEvents");
const { format } = require('date-fns');
const logByWinston = require('./logWinston');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const createErrorLog = async(params) => {
  const env = process.env.NODE_ENV || 'development';

  const logDir = path.join(__dirname, '..', 'logs');

  // Create the log directory if it does not exist
  if (!fs.existsSync(logDir)) await fsPromises.mkdir(logDir);

  const filename = path.join(logDir, `${env}-error.log`);

  const json = {
    url: req.url,
    method: req.method,
    path: req.path,
    errName: err.name,
    errMessage: err.message
  }

  logByWinston(filename, json)
}

const errorHandler = async (err, req, res, next) => {
  // logEvents(
  //   `${err.name}: ${err.message}`, 
  //   `error-${format(new Date(), 'yyyy-MM-dd')}.txt`
  // )
  console.error('ERROR------------ : ', err.stack);
  
  const env = process.env.NODE_ENV || 'development';

  const logDir = path.join(__dirname, '..', 'logs');

  // Create the log directory if it does not exist
  if (!fs.existsSync(logDir)) await fsPromises.mkdir(logDir);

  const filename = path.join(logDir, `${env}-error.log`);

  const json = {
    url: req.url,
    method: req.method,
    path: req.path,
    errName: err.name,
    errMessage: err.message
  }

  logByWinston(filename, { message: 'error', logLevel: 'error', info: json });

  res.status(500).send(err.message);
}

module.exports = errorHandler;