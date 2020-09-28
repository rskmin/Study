const postcss = require('postcss');
const loaderUtils = require('loader-utils');
const Tokenizer = require('css-selector-tokenizer');

function loader(cssString) {
  const cssPlugin = (options) => {
    return (cssRoot) => {
      cssRoot.walkAtRules(/^import$/i, rule => {
        rule.remove();
        options.imports.push(rule.params.slice(1, -1));
      });
    }
  }
  let callback = this.async();
  let options = {imports: []};
  let pipeLine = postcss([cssPlugin(options)]);
  pipeLine.process(cssString).then(result => {
    callback(null, "module.exports = ''");
  });
}

module.exports = loader;