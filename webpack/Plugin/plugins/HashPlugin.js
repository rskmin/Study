const { compilation } = require("webpack");

/**
 * hash 每次编译都会产生一个新的 hash，整个项目只要有一个文件产生变化 hash 就会发生变化
 * chunkHash 代码块hash 每一个chunk都有自己的hash值，每个入口的文件都变化都影响自己代码块的hash
 * contentHash 内容hash 跟内容有关，只要内容不变它就不变
 */
class HashPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('HashPlugin', (compilation) => {
      compilation.hooks.afterHash.tap('HashPlugin', () => {
        // webpack 把 hash 值放在了 compilation.hash 属性上
        compilation.hash = 'hash';
        // 拿到本次编译的所有的代码块
        let chunks = compilation.chunks;
        for (let chunk of chunks) {
          chunk.renderedHash = chunk.name + '_chunkHash';
          chunk.contentHash = {
            javascript: 'contentHash',
          };
        }
      });
    });
  }
}

module.exports = HashPlugin;