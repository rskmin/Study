let path = require('path');
let fs = require('fs');
let { runLoaders } = require('./loader-runner');
let loadDir = path.resolve(__dirname, 'loaders');
let request = 'inline-loader1!inline-loader2!./index.js';
let inlineLoaders = request
.replace(/^-?!+/, '')
.replace(/!!+/g, '!')
.split('!');
let resource = inlineLoaders.pop();// 获取要加载的资源路径
/**
 * 获取loader的绝对路径
 * @param {string} loader 
 * @returns {string} loaderPath
 */
let resolveLoader = (loader) => path.resolve(loadDir, loader);
inlineLoaders = inlineLoaders.map(resolveLoader);
var rules = [
  {
    enforce: 'pre',
    test: /\.js$/,
    use: ['pre-loader1'],
  },
  {
    test: /\.js$/,
    use: ['normal-loader1', 'normal-loader2'],
  },
  {
    enforce: 'post',
    test: /\.js$/,
    use: ['post-loader1', 'post-loader2'],
  },
  {
    enforce: 'pre',
    test: /\.js$/,
    use: ['pre-loader2'],
  },
];

let preLoaders = [];
let postLoaders = [];
let normalLoaders = [];
const loaderMap = {
  pre: rule => preLoaders.push(...rule),
  post: rule => postLoaders.push(...rule),
  normal: rule => normalLoaders.push(...rule),
}
for (let i = 0; i < rules.length; i++) {
  let rule = rules[i];
  if (rule.test.test(resource)) {
    rule.enforce ? loaderMap[rule.enforce](rule.use) : loaderMap.normal(rule.use);
  }
}

preLoaders = preLoaders.map(resolveLoader);
postLoaders = postLoaders.map(resolveLoader);
normalLoaders = normalLoaders.map(resolveLoader);

let loaders = [];
if (request.startsWith('!!')) {
  loaders = inlineLoaders;
} else if (request.startsWith('-!')) {
  loaders = [...postLoaders, ...inlineLoaders];
} else if (request.startsWith('!')) {
  loaders = [...postLoaders, ...inlineLoaders, ...preLoaders];
} else {
  loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders];
}

runLoaders({
  resource: path.join(__dirname, resource),
  loaders,
  readResource: fs.readFile.bind(fs),
}, (err, result) => {
  console.log("result", result);
  console.log("err", err);
});