const express = require('express');
const app = express();
const port = 8000;

app.use(express.static(__dirname));
app.get('/clock', function (req, res) {
  res.header('Content-Type', 'text/event-stream');
  let counter = 1;
  setInterval(function () {
    res.write(`id:${counter++}\nevent:message\ndata:${new Date().toLocaleString()}\n\n`);
  }, 1000);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));