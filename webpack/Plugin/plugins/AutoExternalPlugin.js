/**
 * 1. 自动向产出的 HTML 里插入 script 标签， 标签的 src 指向库的 CDN
 * 2. 当引入lodash jquery 模块的时候，自动转为外部模块，不再打包此模块到 chunk，读取 window 上的变量
 * 3. 当项目使用了模块才引入 CDN 脚本
 */

const ExternalModule = require('webpack/lib/ExternalModule');
const HtmlWebpackPlugin = require('html-webpack-plugin');

class AutoExternalPlugin {
  constructor(options) {
    this.options = options;
    this.usedExternalModules = new Set();
  }
  apply(compiler) {
    let { options, usedExternalModules } = this;
    // webpack Module (NormalModule普通模块 普通JS模块
    // 普通模块 NormalModule 是由 NormalModuleFactory 创建
    compiler.hooks.normalModuleFactory.tap('AutoExternalPlugin', (normalModuleFactory) => {
      normalModuleFactory.hooks.parser
        .for('javascript/auto')
        .tap('AutoExternalPlugin', (parser) => {
          parser.hooks.import.tap('AutoExternalPlugin', (statement, source) => {
            if (options[source]) {
              usedExternalModules.add(source);
            }
          })
          parser.hooks.call.for('require').tap('AutoExternalPlugin', (expression) => {
            let value = expression.arguments[0].value;
            if (options[value]) {
              usedExternalModules.add(value);
            }
          });
        });
      // 拿到普通模块工厂
      normalModuleFactory.hooks.factory.tap('AutoExternalPlugin', (factory) => (data, callback) => {
        // 由 factory 创建对应模块并将模块传给 callback
        let request = data.request; // 要加载的模块的名字
        if (options[request]) { // jquery || lodash
          const { variable } = options[request]; // $ || _
          // 创建一个外部模块并返回
          // callback(null, new ExternalModule(variable, 'window', request));
          newFactory(data, callback);
        } else {
          factory(data, callback); // 走
        }
        function newFactory(data, callback) {
          const { request } = data;
          /**
           * window上的属性名
           * 从window上获取额外模块
           * 模块名称
           */
          const externalModule = new ExternalModule(options[request], 'window', request);
          callback(null, externalModule);
        }
      });
    })

    // 自动向产出的 html 中插入 script 标签
    compiler.hooks.compilation.tap('AutoExternalPlugin', (compilation) => {
      // HtmlWebpackPlugin 可以向 compilation 增加额外的钩子供其它插件来调用
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync('AutoExternalPlugin', (htmlPluginData, callback) => {
        let scriptUrls = Object.keys(options).filter(key => usedExternalModules.has(key)).map(key => options[key].url);
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