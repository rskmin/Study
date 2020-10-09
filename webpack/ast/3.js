const babel = require('@babel/core');
const arrowPlugin = require('babel-plugin-transform-es2015-arrow-functions');
const t = require('babel-types');
const code = `const sum = (a, b) => {
  console.log(this);
  return a + b;
}`;

const arrowFunctionPlugin = {
  visitor: {
    ArrowFunctionExpression: (path) => {
      let node = path.node;
      let id = path.parent.id;
      let params = node.params;
      let functionExpression = t.functionExpression(id, params,
        node.body,
        node.generator, node.async);
      let thisVariableDeclaration = t.variableDeclaration('var', [
        // var _this = this;
        t.variableDeclarator(t.identifier('_this'), t.thisExpression())
      ]);
      let newNodes = [thisVariableDeclaration, functionExpression];
      path.replaceWithMultiple(newNodes);
    },
    ThisExpression(path) {
      if (path.parent.type === 'CallExpression') {
        path.replaceWith(t.identifier('_this'));
      }
    }
  }
}

let result = babel.transform(code, {
  plugins: [arrowFunctionPlugin],
});
console.log(result.code);
