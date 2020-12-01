const { stat } = require('fs').promises;
const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const mime = require('mime');

const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url);
  const filepath = path.join(__dirname, pathname);
  try {
    const statObj = await stat(filepath);
    res.setHeader('Context-Type', mime.getType(pathname));
    fs.createReadStream(filepath).pipe(res);
  } catch (e) {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(8080);