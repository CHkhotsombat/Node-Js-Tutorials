const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter {};

// initialize object
const myEmitter = new Emitter();

// add listener for log event
// myEmitter.on('log', (msg) => logEvents(msg));
// myEmitter.emit('log', 'Log event emitted');

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  let indexPath;

  if (req.url === '/' || req.url === 'index.html'){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    indexPath = path.join(__dirname, 'views', 'index.html');
    fs.readFile(indexPath, 'utf8', (error, data) => {
      res.end(data)
    });
  }
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));