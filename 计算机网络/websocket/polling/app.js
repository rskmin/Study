const express = require('express');
const app = express();
const port = 8000;

app.use(express.static(__dirname));
app.get('/clock', function (req, res) {
  let data = {
    time: new Date().toLocaleString()
  };
  res.send(JSON.stringify(data));
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));