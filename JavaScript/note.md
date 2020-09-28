# JavaScript

## ES6新特性

### 类(class)

### 迭代器

### for...of...(遍历可迭代对象)

### 模板字符串

### 原始数据类型Symbol

### 解构赋值

### generator(迭代器生成器)

### Promise

### async/await(generator+Promise+co)

- co: generator的自动执行器

### 默认参数

### 块级作用域（let 和 const）

- ES6改变了执行上下文的结构，原先的 **变量对象(VO)** 被细分为 **变量环境(variableEnvironment)** 和 **词法环境(lexicalEnvironment)** (多层结构，对应块级作用域的多层嵌套) , 块级作用域的 `let` 和 `const` 声明会被放入词法环境。变量环境为该执行上下文的最顶层环境，若在该层找不到变量定义，会沿着 `outer` 属性找到上层执行上下文环境中变量环境或词法环境的引用，`outer` 形成了作用域链，取代了数组形式的 `scopeChain` 作用域链

### 箭头函数

- this指向的是箭头函数所在上下文中的this

### 幂运算(**)

### 三点运算符

- 剩余运算符作用
- 扩展运算符作用

### Array新方法

- reduce(迭代)
- find
- findIndex

### Reflect

- 可抛出错误信息

### Set

### Map

### Proxy

### 模块化(ES Module)

## 模块化

- CommonJS 和 ES Module 的区别
  - 语法不同
  - CommonJS 是运行时加载模块，ES6 在静态编译期间确定模块依赖
  - CommonJS 导出的是一个值的拷贝，ES6 是值的引用
  - ES6 会将`import`提升到顶部，CommonJS不会提升 `require`
  - CommonJS 中的this指向的是模块本身，ES6 模块中的this指向的是 `undefined`
  - 循环导入实现不同，CommonJS 循环导入时返回的时已加载部分，ES6 由于返回的是引用需要用户手动判断
- AMD
  - 异步加载模块，浏览器优先，推崇依赖前置
- CMD
  - 延迟执行，推崇依赖就近
- CommonJS
  - 同步加载，服务端规范
  - 规范：一个单独的文件就是一个模块。加载模块用 `require` 方法，导出内容用 `module.exports`
- UMD
  - AMD和CommonJS 结合，判断环境决定使用什么规范
- ESM(ES Module)
- SystemJS