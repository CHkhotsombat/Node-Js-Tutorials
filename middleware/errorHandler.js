const { logEvents } = require("./logEvents");
const { format } = require('date-fns');

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}`, 
    `error-${format(new Date(), 'yyyy-MM-dd')}.txt`
  )
  console.error(err.stack);
  res.status(500).send(err.message);
}

module.exports = errorHandler;