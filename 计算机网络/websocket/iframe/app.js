const express = require('express');
const app = express();
const port = 8000;

app.use(express.static(__dirname));
app.get('/clock', function (req, res) {
  res.header('Content-Type', 'text/html');
  setInterval(function () {
    res.write(`
    <script>
      parent.setTime("${new Date().toLocaleString()}")
    </script>
  `);
  }, 1000);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));