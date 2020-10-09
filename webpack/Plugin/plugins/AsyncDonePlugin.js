class AsyncDonePlugin {
  apply(compiler) {
    // done: new AsyncSeriesHook(['stats']),
    compiler.hooks.done.tapAsync('AsyncDonePlugin', (stats, callback) => {
      console.log('tapAsync AsyncDonePlugin');
      callback();
    });
  }
}

module.exports = AsyncDonePlugin;