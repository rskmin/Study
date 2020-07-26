## cookie session 和 localStorage SessionStorage 的区别

- cookie

http是无状态的 cookie 可以用来识别状态(客户端， 服务端都可以设置)， 每次请求服务器时都会发送到服务器 (合理设置cookie，cookie默认是不安全的，不能用来存放敏感信息)

- session 基于cookie

可以认为 session 就是一个服务器的对象， 存储在服务器中，不能持久化存储(可以利用数据库持久化存储)，session共享比较麻烦

- localStorage SessionStorage 存储到浏览器中

  - localStorage(必须手动销毁) 不能频繁设置，不能每次请求都带上，大小限制为`5M`

  - SessionStorage(浏览器关闭后销毁)