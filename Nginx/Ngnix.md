# Nginx 的中间件架构

## 中间件

- 代理 `应用 - 应用` 或 `应用 - 操作系统`之间的请求

## Nginx(Web服务)

- Nginx是一个开源且高性能、可靠的HTTP中间件、代理服务

- 采用IO多路复用epoll模型

- CPU亲和

  - CPU核心和Nginx工作进程绑定方式

  - 把每个worker进程固定在一个cpu上执行

  - 减少切换cpu的cache miss，获得更好的性能

- sendfile

  - 静态资源请求: File -> 内核空间 -> 用户空间 -> Socket

  - Nginx处理静态资源: File -> 内核空间 -> Socket

## epoll模型

- Linux操作系统内核模块，处理IO复用的内核模型(实现IO复用)

- 解决 `SELECT` 模型对于文件句柄FD打开限制

- 采用 `callback` 函数回调机制优化模型效率