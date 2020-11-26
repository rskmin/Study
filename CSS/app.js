const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const express = require('express');
const resolve = (...arr) => path.resolve(__dirname, ...arr)

// 读取ejs模板文件生成模板
const str = fs.readFileSync(resolve('public/index.ejs'), {
  encoding: 'utf-8'
});
let template = ejs.compile(str);

// 读取文件夹数据
let dirList = fs.readdirSync(__dirname);
dirList = dirList.reduce((arr, name) => {
  const excludeDir = ['public', 'node_modules'];
  const isDirectory = fs.statSync(resolve(name)).isDirectory();
  if (isDirectory && !excludeDir.includes(name)) {
    let contentList = fs.readdirSync(resolve(name));
    // 去除非文件夹内容
    contentList = contentList.reduce((arr, item) => {
      const isDir = fs.statSync(resolve(name, item)).isDirectory();
      if (isDir) {
        arr.push(item);
      }
      return arr;
    }, []);
    arr.push({
      name,
      contentList,
    });
  }
  return arr;
}, []);

// 获取数据渲染页面
const data = {
  PUBLIC_URL: '/public',
  dirList,
};
const html = template(data);

// 静态服务
const app = express();
const port = 8080;
app.use(express.static(__dirname));
app.get('/', (req, res) => res.end(html));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
