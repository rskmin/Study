let babel = require('@babel/core'); // 将源代码转化成AST语法树
let t = require('babel-types'); // 类型判断某个节点是否是某种类型，或者创建一个新的某种类型的节点
// let arrowFunctionPlugin = require('babel-plugin-transform-es2015-arrow-functions');
let code = 'const sum = (a,b)=> a+b';

let arrowFunctionPlugin = {
  visitor: {
    // babel 在遍历到 ArrowFunctionExpression 类型的节点的时候，会把当前路径传过来
    ArrowFunctionExpression: (path) => {
      let node = path.node; // 当前路上的节点
      let id = path.parent.id; // 父路径的 ID identifier
      let params = node.params;
      let functionExpression = t.functionExpression(id, params,
        t.blockStatement([t.returnStatement(node.body)]),
        node.generator, node.async);
      path.replaceWith(functionExpression);
    }
  }
}

let result = babel.transform(code, {
  plugins: [arrowFunctionPlugin],
});
console.log(result.code);