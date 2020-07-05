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
