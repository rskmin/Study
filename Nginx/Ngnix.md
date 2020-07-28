Nginx 的中间件架构

## 中间件

- 代理 `应用 - 应用` 或 `应用 - 操作系统` 之间的请求(http代理服务)

- 缓存服务

## Nginx

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

## 安装目录

| 路径 | 类型 | 作用 |
| :---- | :---- | :---- |
| /etc/logrotate.d/nginx | 配置文件 | Nginx日志转轮，用于logrotate服务的日志切割 |
| <div>/etc/nginx<br>/etc/nginx/nginx.conf<br>/etc/nginx/conf.d<br>/etc/nginx/conf.d/default.conf</div> | 目录、配置文件 | Nginx主配置文件 |
| <div>/etc/nginx/fastcgi_params<br>/etc/nginx/uwsgi_params<br>/etc/nginx/scgi_params</div> | 配置文件 | cgi配置相关，fastcgi配置 |
| <div>/etc/nginx/koi-utf<br>/etc/nginx/koi-win<br>/etc/nginx/win-utf</div> | 配置文件 | 编码转换映射转换文件 |
| /etc/nginx/mime.types | 配置文件 | 设置http协议的Content-Type与扩展名对应关系 |
| <div> /usr/lib/systemd/system/nginx-debug.service<br>/usr/lib/systemd/system/nginx.service<br>/etc/sysconfig/nginx<br>/etc/sysconfig/nginx-debug</div> | 配置文件 | 用于配置出系统守护进程管理器管理方式 |
| <div>/usr/lib64/nginx/modules<br>/etc/nginx/modules</div> | 目录 | Nginx模块目录 |
| <div>/usr/sbin/nginx<br>/usr/sbin/nginx-debug</div> | 命令 | Nginx服务的启动管理的终端命令 |
| <div>/usr/share/doc/nginx-@版本<br>/usr/share/doc/nginx-@版本/COPYRIGHT<br>/usr/share/man/man8/nginx.8.gz</div> | 文件、目录 | Nginx的手册和帮助文件 |
| <div>/var/cache/nginx</div> | 目录 | Nginx的缓存目录 |
| <div>/var/log/nginx</div> | 目录 | Nginx的日志目录 |

## 安装编译参数

| 编译选项 | 作用 |
| :---- | :---- |
| <div>--prefix=/etc/nginx<br>--sbin-path=/usr/sbin/nginx<br>--modules-path=/usr/lib64/nginx/modules<br>--conf-path=/etc/nginx/nginx.conf<br>--error-log-path=/var/log/nginx/error.log<br>--http-log-path=/var/log/nginx/access.log<br>--pid-path=/var/run/nginx.pid<br>--lock-path=/var/run/nginx.lock</div> | 安装目的目录或路径 |
| <div>--http-client-body-temp-path=/var/cache/nginx/client_temp<br>--http-proxy-temp-path=/var/cache/nginx/proxy_temp<br>--http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp<br>--http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp<br>--http-scgi-temp-path=/var/cache/nginx/scgi_temp</div> | 执行对应模块时，Nginx所保留的临时性文件 |
| <div>--user=nginx<br>--group=nginx</div> | 设定Nginx进程启动的用户和组用户 |
| <div>--with-cc-opt=parameters</div> | 设置额外的参数将被添加到CFLAGS变量 |
| <div>--with-Id-opt=parameters</div> | 设置附加的参数,链接系统库 |


## 默认配置语法

```nginx
user nginx; # 设置nginx服务的系统使用用户
worker_processes auto; # 工作进程数
error_log /var/log/nginx/error.log; # nginx的错误日志
pid /run/nginx.pid; # nginx服务启动时的pid

events {
    worker_connections 1024; # 每个进程允许最大连接数
    # use 工作进程数
}

http {
    
}
```

