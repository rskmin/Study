# 面试知识点整理

## CSS部分

### 盒子模型

- W3C盒子模型(标准盒模型)：`box-sizing: content-box;` 默认设置，元素内容占据的空间(content)是由 `width` 属性设置的，而 `padding` 和 `border` 是另外设置的
- IE盒子模型(怪异盒模型): `box-sizing: border-box` width = content + padding + border

### Flex 布局

#### 容器属性

- flex布局一般用于单轴线的元素布局，当然也可以设置 `flex-wrap: wrap | wrap-reverse;` 进行多轴线布局

- `flex-direction: row<default> | column | row-reverse | column-reverse;` 元素控制排列方向
- `flex-flow: <flex-direction> <flex-wrap>` 缩写
- `justify-content` 属性定义主轴上的对齐方式， `align-items` 定义在交叉轴上的对齐方式， `align-content` 定义多轴线的对齐方式

#### 项目属性

- `order` 定义元素的排列顺序
- `flex-basis: auto<default>` 定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性计算剩余空间大小
- `flex-grow: 0<default>;` 根据剩余空间放大，`flex-shrink: 1<default>` 根据剩余空间缩小，`flex：<flex-grow> <flex-shrink> <fiex-basis> `  前三个的缩写 俩个快捷值 `auto (1 1 auto)` `none (0 0 auto)`

- `align-self` 单独设置 `align-items` 属性



## 浏览器

### 存储

#### cookie

基于HTTP规范，用来识别用户，解决了HTTP的无状态问题，用来记录一些用户相关状态

cookie是服务器发送到浏览器的一小段数据，会在浏览器下次向服务器再次发起请求时被携带发送到服务器上(可以设置过期时间)

**缺点**

1. 大小限制在4KB左右，只能存取少量信息（使用存储空间更大的Web Storage）
2. 过多的cookie会导致请求体积增大浪费性能 (压缩cookie)

**属性列表**

| **属性**  |                           **作用**                           |
| :-------: | :----------------------------------------------------------: |
|   value   |                           cookie值                           |
| http-only |               不允许JS访问cookie，防止XSS攻击                |
|  secure   |            只允许在协议为HTTPS的请求中携带cookie             |
| same-site | Lax(默认)：允许与第三方的get请求一起发送<br>Strict: 不允许与第三方请求一起发送<br>None: 任何请求都会携带 |

`same-site` 有效防止了 XSRF 攻击

#### Web Storage(5M左右)

**local Storage**

数据可以长期保留，需要用户手动删除

**session Storage**

页面关闭时数据会被清除

#### indexedDB

事务型数据库



### 安全

#### XSS攻击(跨站脚本攻击)

- 原理：用户输入的数据出现在代码中成为脚本
- 类型
  - 反射型： url别人，发送该url给别人(可生成短链接伪装)
  - 存储型：脚本注入到数据库中，再次被渲染到页面中
- 防范：阻止用户输入的内容形成脚本
  - 浏览器提供：设置HTTP头 `X-XSS-Protection`, 用户输入内容再次出现在HTML中时会进行拦截(在html词法分析后进行)
  - 转义
  - 黑白名单：针对富文本
  - CSP(内容安全策略): 通过HTTP头限制某些内容的执行

#### CSRF(跨站请求伪造)

- 原理：浏览器请求会携带cookie信息，利用cookie信息上的登录态伪装用户操作
- 防范
  - 由于是利用cookie的信息，只要不发送cookie就好了，设置 `same-site` 限制cookie发送条件
  - CSRF攻击直接访问后端接口，不经过前端，只要在前端站点设置判断信息传送给后端校验(自定义信息或者referer)

### 缓存

#### 强制缓存

- `cache-control: max-age=time` 设置缓存时间
- `Expire: Date` 设置过期时间

#### 协商缓存(对比缓存)

- 对比时间
  - 服务端设置头 `Last-Modified`
  - 客户端返回 `if-modified-since`
  - 缺点
    1. 秒级内的修改不会改变修改时间导致内容无法实时更新
    2. 为对文件内容进行修改只进行保存操作会修改时间，导致缓存失效
- 对比标记(计算hash)
  - 服务端设置头 `Etag`
  - 客户端返回 `if-None-Match`

### 跨域

#### CORS(跨域资源共享)

- 使用额外的HTTP头允许Web应用访问该服器上的指定资源
- 复杂请求需要额外设置更多的请求头，并且会发出一次预检请求(OPTIONS)
- 优点
  - 支持多种请求方式
  - 使用AJAX监听，有更好的错误处理能力
- 缺点
  - 兼容性(也不是很差)

#### JSONP

- 利用浏览器 `script` 标签的跨域能力
- 优点
  - 兼容性好
- 缺点
  - 只支持get请求
  - XSS攻击风险大
- 方式
  1. 前端定义解析函数
  2. 在请求中声明解析函数
  3. 后端获取函数声明，以带参执行的形式传递给前端
  4. 前端执行了解析函数，函数内的参数就是服务端传入的值

#### http-proxy(代理)

- 正向代理：利用服务端请求无跨域问题，架一层中间层，由该层代替请求其他域下的内容
- Nginx反向代理
  1. 浏览器请求nginx服务
  2. nginx服务去请求html
  3. 外部资源路径以`/XXX` 的形式都是以nginx域发出的请求
  4. nginx再去请求其他域的接口返回

- WebSocket：无跨域限制
- window.postMessage()：浏览器提供的跨页面通信方案

#### 基于iframe的各种方案

- window.name: iframe的window.name 上的属性不会随着src的改变而消失
- Location.hash
- document.domain: 解决二级或三级域名不同情况下的跨域问题

