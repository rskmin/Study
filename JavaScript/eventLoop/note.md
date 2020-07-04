# 浏览器事件循环

![事件循环](./eventLoop.png)

## 宏任务 微任务

## vue2 nextTick (延迟渲染) 的四种策略

1. Promise.then

2. mutationObserver

3. setImmediate(IE and Node)(效率优于setTimeout)

4. setTimeout(比setImmediate先执行)