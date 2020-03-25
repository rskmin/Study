const express = require('express');
const path = require('path');
const app = express();

// 处理静态文件
app.use(express.static('client/dist'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

app.get('/api/datas', (req, res) => {
  res.json({
    name: '米斯特吴',
    wechat: '27732357'
  });
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
