const { compilation } = require("webpack");

/**
 * hash 每次编译都会产生一个新的 hash，整个项目只要有一个文件产生变化 hash 就会发生变化
 */
class HashPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('HashPlugin', (compilation) => {
      compilation.hooks.afterHash.tap('HashPlugin', () => {
        // webpack 把 hash 值放在了 compilation.hash 属性上
        compilation.hash = 'hash';
      });
    });
  }
}

module.exports = HashPlugin;