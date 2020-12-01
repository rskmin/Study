const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const express = require('express');
const resolve = (...arr) => path.resolve(__dirname, ...arr)

/**
 * 读取 ejs 生成模版
 * @returns {ejs.TemplateFunction}
 */
async function readEjs() {
  const str = await fsp.readFile(resolve('public/index.ejs'), {
    encoding: 'utf-8'
  });
  const template = ejs.compile(str);
  return template;
}

/**
 * @typedef {Object} DirItem
 * @property {string[]} contentList
 * @property {string} dirname
 */
/**
 * 读取文件夹数据
 * @returns {DirItem[]}
 */
async function readDirList() {
  let dirList = await fsp.readdir(__dirname);
  dirList = dirList.reduce((arr, dirname) => {
    const excludeDir = ['public', 'node_modules'];
    const isDirectory = fs.statSync(resolve(dirname)).isDirectory();
    if (isDirectory && !excludeDir.includes(dirname)) {
      let contentList = fs.readdirSync(resolve(dirname));
      // 去除非文件夹内容
      contentList = contentList.reduce((arr, item) => {
        const isDir = fs.statSync(resolve(dirname, item)).isDirectory();
        if (isDir) {
          arr.push(item);
        }
        return arr;
      }, []);
      arr.push({
        dirname,
        contentList,
      });
    }
    return arr;
  }, []);
  return dirList;
}
/**
 * 读取基本样式
 * @returns {string}
 */
async function readBasicCss() {
  const basicCss = await fsp.readFile(resolve('public/basic.css'));
  const styleTag = `<style>${basicCss.toString()}</style>`
  return styleTag;
}

async function runServer() {
  const template = await readEjs();
  const dirList = await readDirList();
  const basicCss = await readBasicCss();

  // 获取数据渲染页面
  const data = {
    PUBLIC_URL: '/public',
    dirList,
    basicCss,
  };
  const html = template(data);

  // 静态服务
  const app = express();
  const port = 8080;
  app.use(express.static(__dirname));
  app.get('/', (req, res) => res.end(html));
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}
runServer();


