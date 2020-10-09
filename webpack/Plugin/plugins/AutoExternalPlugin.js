/**
 * 1. 自动向产出的 HTML 里插入 script 标签， 标签的 src 指向库的 CDN
 * 2. 当引入lodash jquery 模块的时候，自动转为外部模块，不再打包此模块到 chunk，读取 window 上的变量
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

class AutoExternalPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    let {options} = this;

    // 自动向产出的 html 中插入 script 标签
    compiler.hooks.compilation.tap('AutoExternalPlugin', (compilation) => {
      // HtmlWebpackPlugin 可以向 compilation 增加额外的钩子供其它插件来调用
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync('AutoExternalPlugin', (htmlPluginData, callback) => {
        let scriptUrls = Object.values(options).map(item => item.url);
        scriptUrls.forEach(url => {
          htmlPluginData.assetTags.scripts.unshift({
            tagName: 'script',
            voidTag: false,
            attributes: {
              defer: false,
              src: url,
            },
          });
        });
        // 异步串行瀑布钩子
        callback(null, htmlPluginData);
      });
    });
  }
}

/* {
  jquery: {
    expose: '$',
      url: 'https://lib.baomitu.com/jquery/3.1.0/jquery.js'
  },
  lodash: {
    expose: '_',
      url: 'https://lib.baomitu.com/lodash.js/4.17.19/lodash.js',
  },
} */

module.exports = AutoExternalPlugin;