class AssetsPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    // 通过监听 compilation 钩子可以拿到最新的 compilation
    compiler.hooks.compilation.tap('AssetsPlugin', (compilation, params) => {
      // 通过监听 compilation 的 chunkAsset 钩子可以拿到每个被添加的chunk和它对应的文件名
      compilation.hooks.chunkAsset.tap('AssetsPlugin', (chunk, filename) => {
        console.log("AssetsPlugin -> apply -> filename", filename)
        console.log("AssetsPlugin -> apply -> chunk", chunk.name)
      });
    });
  }
}

module.exports = AssetsPlugin;