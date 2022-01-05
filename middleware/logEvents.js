const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { format } = require('date-fns');

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyy-MM-dd\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  const logPath = path.join(__dirname, '..', 'logs');
  const logFile = path.join(logPath, logFileName);
  console.log(logItem);
  try {
    if (!fs.existsSync(logPath)) {
      await fsPromises.mkdir(logPath)
    }
    await fsPromises.appendFile(logFile, logItem);
  } catch (error) {
    console.error(error);
  }
}

const logger = (req, res, next) => {
  logEvents(
    `${req.method}\t${req.headers.origin}\t${req.url}`, 
    `log-${format(new Date(), 'yyyy-MM-dd')}.txt`
  );
  console.log(`${req.method} ${req.path}`);
  next();
}

module.exports = { logger, logEvents };