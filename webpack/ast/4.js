const babel = require('@babel/core'); // 将源代码转化成AST语法树
const t = require('babel-types'); // 类型判断某个节点是否是某种类型，或者创建一个新的某种类型的节点
// const classesPlugin = require('babel-plugin-transform-es2015-classes');

let code = `
class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}`;

const classesPlugin = {
  visitor: {
    ClassDeclaration(path) {
      let node = path.node; // 类的节点
      let id = node.id;
      // 转换 构造函数constructor 普通函数
      let methods = node.body.body; // 方法名数组 [constructor, getName]
      let constructorFunction;
      let newNodes = [];
      methods.forEach(method => {
        if (method.kind === 'constructor') {
          constructorFunction = t.functionDeclaration(
            id, method.params, method.body, method.generator, method.async
          );
          newNodes.push(constructorFunction)
        } else {
          let memberExpression = t.memberExpression(
            t.memberExpression(id, t.identifier('prototype')), // Person.prototype
            method.key // getName
          );
          let functionExpression = t.functionExpression(
            null, method.params, method.body, method.generator, method.async
          );
          let assignmentExpression = t.assignmentExpression('=',
            memberExpression,
            functionExpression
          );
          newNodes.push(assignmentExpression);
        }
      });
      path.replaceWithMultiple(newNodes);
    }
  },
};

let result = babel.transform(code, {
  plugins: [classesPlugin],
});

console.log(result.code);

/*
function Person(name) {
  this.name = name;
}
Person.prototype.getName = function () {
  return this.name;
}
 */