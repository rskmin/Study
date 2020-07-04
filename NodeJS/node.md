# Node

## 中间层

- 解决前后端跨域问题

- 格式化后端返回数据

- SSR

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

  - process.kill 杀死进程

  - process.exit 退出进程

  - process.nextTick node中的微任务 当前执行栈的底部 优先级比promise高

  - process.cwd()  当前的工作目录

  - process.env 环境变量

  - process.argv 执行时所带的参数
