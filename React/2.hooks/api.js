const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 8000;

app.get('/api/users', (req, res, next) => {
  let start = parseInt(req.query.start);
  let pageSize = parseInt(req.query.pageSize);
  let users = [];
  for (let i = start; i < start + pageSize; i++) {
    users.push({
      id: `${i + 1}`,
      name: `name_${i}`,
    });
  }
  res.json({data: users});
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));