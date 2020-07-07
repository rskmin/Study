# Node

## 中间层

- 解决前后端跨域问题

- 格式化后端返回数据

- SSR

## 事件环

![event-loop](./img/event-loop.png)

``````js
    定时器:本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
   ┌───────────────────────────┐
┌─>│           timers          │ 
│  └─────────────┬─────────────┘
|   待定回调:执行延迟到下一个循环迭代的 I/O 回调。
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
|   idle,prepare:仅系统内部使用。
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      
|  轮询:检索新的I/O事件;执行与 I/O相关的回调   ┌───────────────┐
│  ┌─────────────┴─────────────┐            │   incoming:   │
│  │           poll            │<───────────┤  connections, │
│  └─────────────┬─────────────┘            │   data, etc.  │
│  检测:setImmediate() 回调函数在这里执行。   └───────────────┘
│  ┌─────────────┴─────────────┐      
│  │           check           │
│  └─────────────┬─────────────┘
|  关闭函数的回调:一些关闭的回调函数
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
``````

## 支持多进程

## 全局对象

- global || globalThis

``````js
global: [Circular],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] { [Symbol(util.promisify.custom)]: [Function] },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(util.promisify.custom)]: [Function]
  }
``````

- process(进程)

  - process.nextTick node中的微任务 放入当前执行栈的底部 优先级比promise高

  - process.cwd()  当前的工作目录

  - process.env 环境变量

    - windows: set key=value, linux: export key=value

    - cross-env 设置环境变量的包, 可以跨平台设置环境

  - process.argv 执行时所带的参数

## 模块

- Module.prototype.require(id)

  1. id是否为字符串

  2. id是否为空(否：报错)

  3. 引用层数增加(requireDepth++)

  4. 加载模块， 捕获加载模块异常，加载失败引用层数减少(requireDepth--)

- Module._load(require, parent, isMain) 加载模块

  1. 查看是否有相对路径缓存(true: 返回缓存, false: next)

  2. Module._resolveFilename(request, parent, isMain) 将模块路径转化为绝对路径

  3. 查看是否有绝对路径缓存(true: 返回缓存, false: next)

  4. 查看是否是原生模块(true: 加载原生模块并返回, false: next)

  5. let module = new Module(filename, parent) 创建模块对象 id: 路径, exports: 导出结果

  6. 缓存模块对象

  7. 相对解析路径缓存

  8. module.load() 加载模块内容

- module.load()
 
  1. let extension = findLongestRegisteredExtension(filename) 获取模块扩展名

  2. Module._extensions[extension](this, filename) 调用对应模块解析规则

- Module._extensions[extension](this, filename)

  1. const content = fs.readFileSync(filename, 'utf8') 读取文件内容

  2. module._compile(content, filename) 编译模块

- module._compile(content, filename) 

  1. 将文件内容包裹进函数形成函数字符串，用vm转化成函数

  2. 执行函数并传入参数

  3. 返回 module.exports 中的结果