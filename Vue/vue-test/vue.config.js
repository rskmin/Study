module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "src/styles/global-import.scss";'
      }
    }
  }
}