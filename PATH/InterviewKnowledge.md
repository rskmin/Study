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

### 渲染原理

#### 渲染过程

- 解析HTML构建DOM树
  - 注释会在DOM树中
  - 空白符会在DOM树中

- 遇到CSS时解析CSS构建CSSOM树
  - css解析与DOM解析同时进行
- DOM树和CSSOM树构建完后基于这两棵树构建渲染树(Render Tree)
  - 浏览器从DOM树的根节点开始遍历每个 **可见节点** ，然后去查找适配的CSS规则并运用
  - `display: none;` 的元素不在渲染树中，`visibility:hidden;` 的元素在渲染树中
- 通过遍历渲染树读取样式信息进行布局
  - `float` `absolute` `fixed` 会发生位置偏移
  - 脱离文档流就是脱离渲染树
- 绘制渲染树

#### 渲染性能

##### 阻塞

- JS有调用DOM和CSSOM树接口并对其修改的能力，所以在解析到 `<script>` 标签时，会暂停DOM构建，直至脚本加载执行完
  - `script` 的 `async` 属性，可以让外部脚本异步加载，不阻塞HTML解析
  - `script` 的 `defer` 属性，延迟脚本执行直到页面加载
- 如果JS操作了CSSOM，而CSSOM还没下载和构建会等待CSSOM的下载和构建同时阻塞了DOM构建
  - CSS脚本放头部防止 **渲染阻塞** 
  - JS脚本放底部或者设置 `async` 或 `defer` 属性

##### 重绘和回流

回流必定引起重绘，重绘不一定回流

- 回流：浏览器布局发生变化 + 获取元素的某些属性(浏览器为了确保获取属性的正确性会触发回流) + `resize` 和 `scroll` 时修改字体大小(防抖、节流)
- 重绘：不影响布局的部分发生改变(如颜色)
- 优化
  - 用 `transform` 做形变和位移可以减少回流
  - 尽量一次性修改节点样式(利用class)
  - 使用 `DocumentFragment` 将要多次修改的DOM存入内存，最后一次性 `append` 到DOM树中(或用于大量节点的插入)
  - 将要多次修改的DOM元素设置 `display:none;` 让其从渲染树中脱离，修改完成后再显示回渲染树中
  - 避免多次读取回引发回流的属性(例如 `offsetLeft` `scrollTop` `width` 等) 
  - 将复杂节点脱离文档流，形成新的渲染层，降低回流成本

### 网络相关

#### HTTP1.1和HTTP2.0

- HTTP1.1
  - 长连接：设置 `keep-alive` 允许再一定时间内，同一域多次请求数据，只建立一次http连接，使用通道以提高效率
  - 支持只发送 **header** 信息
  - 引入更多的缓存控制等策略
  - 管道机制：可以将浏览器的请求一次性全部发送给服务器，无需等待上一个完成再发送下一个
- HTTP2.0(使用二进制数据帧传输)
  - 多路复用：TCP连接可以承载任意数量的双向数据流，多个帧之间可以乱序发送，然后根据帧首部的流标识重新组装
  - 头部数据压缩：HPACK 算法，维护一份相同的字典
  - 服务器推送：服务端可以在发送HTML时主动推送其它资源，不用等浏览器解析到响应位置再发起请求

#### HTTP和HTTPS

|          |  HTTP  |       HTTPS        |
| :------: | :----: | :----------------: |
|  CA证书  | 不需要 | 需要(产生一定费用) |
| 是否加密 |  明文  |      SSL加密       |
|   端口   |   80   |        443         |
|   状态   | 无状态 |       有状态       |

#### 加载URL全过程

- 首先进行域名解析
  - 浏览器搜索自己的DNS缓存
  - 若没有，则搜索操作系统的DNS缓存
  - 若没有，则操作系统将域名发送至本地域名服务器，本地域名服务器查询自己的DNS缓存
  - 若没有，本地域名服务器向根域名服务器发起请求，根域名服务器返回com域的顶级域名服务器地址，本地域名服务器向com域的顶级域名服务器发起请求，返回权限域名服务器地址，本地域名服务器向权限域名服务器发起请求，得到IP地址。本地域名服务器将IP地址返回给操作系统，操作系统将IP地址返回给浏览器
- 浏览器判断是否需要建立网络连接
- 是，建立HTTP事务发起HTTP请求
- 请求进入传输层，选择传输协议，TCP或UDP，对HTTP封装，加入端口等信息
- 请求进入网络层，通过IP协议将IP地址封装为IP数据报
- 进入数据链路层，把IP数据报添加首部和尾部，封装为MAC帧，根据mac开始建立TCP连接(三次握手)
- TCP连接后如果使用了HTTPS则要进行SSL握手，沟通加密参数以及交换密钥，完成后，报文再发送给TCP之前都会在SSL层加密
- TCP连接后就可以发送HTTP请求(浏览器发送资源请求前会检查缓存)
- 服务端接受请求返回资源
- 浏览器接收资源解析文件
- 传输完成后断开TCP连接或者保持长连接

## JS部分

### ES6新特性

#### 类(class)

#### 迭代器

#### for...of...(遍历可迭代对象)

#### 模板字符串

#### 原始数据类型Symbol

#### 解构赋值

#### generator(迭代器生成器)

#### Promise

#### async/await(generator+Promise+co)

- co: generator的自动执行器

#### 默认参数

#### 块级作用域（let 和 const）

- ES6改变了执行上下文的结构，原先的 **变量对象(VO)** 被细分为 **变量环境(variableEnvironment)** 和 **词法环境(lexicalEnvironment)** (多层结构，对应块级作用域的多层嵌套) , 块级作用域的 `let` 和 `const` 声明会被放入词法环境。变量环境为该执行上下文的最顶层环境，若在该层找不到变量定义，会沿着 `outer` 属性找到上层执行上下文环境中变量环境或词法环境的引用，`outer` 形成了作用域链，取代了数组形式的 `scopeChain` 作用域链

#### 箭头函数

- this指向的是箭头函数所在上下文中的this

#### 幂运算(**)

#### 三点运算符

- 剩余运算符作用
- 扩展运算符作用

#### Array新方法

- reduce(迭代)
- find
- findIndex

#### Reflect

- 可抛出错误信息

#### Set

#### Map

#### Proxy

#### 模块化(ES Module)

- CommonJS 和 ES Module 的区别
  - 语法不同
  - CommonJS 是运行时加载模块，ES6 在静态编译期间确定模块依赖
  - CommonJS 导出的是一个值得拷贝，ES6 是值的引用
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

## Node

## 打包构建工具

### webpack

功能丰富的打包构建工具

### Rollup

JavaScript模块打包器，多用于JS库的打包

## Vue部分

### 双向绑定原理

#### 数据劫持

- Vue2(new Observer(data))
  - `Object.defineProperty` 劫持对象属性
  - 劫持数组方法(切片编程)
- Vue3(reactive())
  - `Proxy` 
- 对比
  - Vue2 用了完全递归的收集的方式，对深层全部劫持
  - Vue3 使用懒递归的方式，在使用到时再对深层目标进行劫持
- 优化
  - Vue2 `Object.freeze` 冻结无用深层对象
  - Vue2 扁平化
  - Vue2 不要将所有数据都放在data中

#### 依赖收集

- Vue3(effect(fn))
  - effect包装并调用一次fn，调用时将包装函数挂在一个唯一变量 `activeEffect` 上，当 `fn` 中使用响应数据时，触发 `get` 方法，响应数据收集 `activeEffect` 上的函数

## Feature

### WebAssembly

- WebAssembly是一种新的编码方式，可以在现代的网络浏览器中运行 － 它是一种低级的类汇编语言，具有紧凑的二进制格式，可以接近原生的性能运行，并为诸如C / C ++等语言提供一个编译目标，以便它们可以在Web上运行。它也被设计为可以与JavaScript共存，允许两者一起工作。以前无法以此方式运行的客户端软件都将可以运行在Web中。

### 微前端

### Module Federation

### NoCode/LowCode

### Imgcook