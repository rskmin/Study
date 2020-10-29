# JavaScript

## ES6新特性

- 类(class)

- 迭代器

- for...of...(遍历可迭代对象)

- 模板字符串

- 原始数据类型Symbol

- 解构赋值

- generator(迭代器生成器)

- <a href="./Promise/promise.md">Promise</a>

- async/await(generator+Promise+co)
  - co: generator的自动执行器

- 默认参数

- 块级作用域（let 和 const）
  - ES6改变了执行上下文的结构，原先的 **变量对象(VO)** 被细分为 **变量环境(variableEnvironment)** 和 **词法环境(lexicalEnvironment)** (多层结构，对应块级作用域的多层嵌套) , 块级作用域的 `let` 和 `const` 声明会被放入词法环境。变量环境为该执行上下文的最顶层环境，若在该层找不到变量定义，会沿着 `outer` 属性找到上层执行上下文环境中变量环境或词法环境的引用，`outer` 形成了作用域链，取代了数组形式的 `scopeChain` 作用域链

- 箭头函数
  - this指向的是箭头函数所在上下文中的this

- 幂运算(**)

- 三点运算符
  - 剩余运算符作用
  - 扩展运算符作用

- Array新方法
  - reduce(迭代)
  - find
  - findIndex

- Reflect
  - 可抛出错误信息

- Set

- Map

- Proxy

- 模块化(ES Module)

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

## JS封装

`封装`也就是把客观事物封装成抽象的类，并且类可以把自己的数据和方法只让可信的类或者对象操作，对不可信的进行信息隐藏。封装是面向对象的特征之一，是对象和类概念的主要特征。

通俗来讲就是，将用户不需要知道的数据和方法隐藏起来，外部无法直接访问。在java中用private、protected关键字来进行修饰。在js中可以用闭包实现。

```js
const person = {
    name:'rskmin',
};
person.name = "dog";
```

这里的person对象的name属性是暴露给用户的，你无法保证用户总是赋值合法的名字。为了解决这个问题，可以使用闭包。

```js
const person = function(){
    let name = 'rskmin';
    const reg = new RegExp(/\d+/);
    return {
        setName: function(newName){
            if (reg.test(newName)){
                console.log('名字无效')
            } else {
                name=newName;
            }
        },
        getName: function(){
            return name;
        }
    }
}
const per = person();
console.log(per.getName());
per.setName('dog');
console.log(per.getName());
per.setName(22);//'无效名字'
per.name = 11;
console.log(per.getName());
```

简单来说，一个类就是一个封装数据以及操作这些数据的代码的逻辑实体。在一个对象内部，某些代码或某些数据可以是私有的，不能被外界访问。通过这种方式，对象对内部数据提供了不同级别的保护，以防止程序中无关的部分意外的改变或错误的使用了对象的私有部分。

-  创建一个类 在ES6之前创建一个类:首先声明一个函数保存在一个对象里，然后按照编程习惯这个代表类的变量名首字母大写，然后在这个函数的内部通过this(函数内部自带的一个变量,用于指向当前这个对象)变量，添加属性或者方法来实现对类属性或方法的添加给类添加属性的时候有两种方法:一种是直接用this指向属性的赋值，一种是通过prototype属性进行赋值，使用this进行属性添加的时候所有的实例化对象都会创建并且具有这个属性的实际内容但是使用prototype属性进行属性添加，其实所有的实例化对象本身是不包含该属性的，只是将该属性添加到该对象的原型属性上，但是由于js的原型链的原理，所有的原型对象也可以调用和使用该属性
-  属性与方法的封装
  - 私有属性:对象的属性不能被访问者看到；只能在函数内部使用。好处就是安全，就类似闭包的函数一样，减少污染。
  - 共有属性(公有属性):当我们定义一个对象后，使用对象的人在实例化之后可以访问到对象内部的属性；
  - 私有方法:对象的方法不能被访问者看到，只能在函数内部使用。好处就是安全，就类似闭包中的函数一样，减少污染
  - 构造方法:通过方法修改实例中的属性或者私有属性的方法
  - 实现方法:由于js定义的变量都只会存在最近的函数作用域或者最近的全局作用域，所以可以通过函数包裹作用域，实现方法和属性的私有化

