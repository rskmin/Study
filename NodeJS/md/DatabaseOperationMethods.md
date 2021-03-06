# 数据库操作方法

## mongoose

> MongoDB 是一个基于分布式文件存储的开源数据库系统
>
> MongoDB 将数据存储为一个文档，数据结构由键值(key => value)对组组成，MongoDB文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组

### 建立连接

```js
const mongoose = require('mongoose')
const mongoURL = 'mongodb://localhost:27017/mongoose'

const conn = mongoose.createConnection(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
```

### 建立集合，给集合设置骨架

```js
// 学生骨架
let StudentSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    maxLength: 8,
    minLength: 6,
    trim: true
  },
  age: {
    type: Number,
    min: 5,
    max: 150
  },
  birthday: {
    type: Date,
    default: Date.now
  },
  hobby: {
    type: String,
    /**
     * 校验数据
     * @param {string} params
     */
    validate(params) {
      return params.startsWith('爱好-')
    }
  },
  password: {
    type: String
  }
})

// 扩展集合静态方法
StudentSchema.statics.findByName = function (username) {
  return this.findOne({username})
}

// 扩展实例(文档)方法
StudentSchema.methods.savePassword = function (val) { // md5加密
  this.password = crypto.createHash('md5', 'zf').update(val).digest('base64')
}

// 导出学生集合
module.exports = conn.model('Student', StudentSchema, 'student')
```

### 集合操作

#### 新增文档

- 集合传参新增

```js
let r = await Student.create({
  username: 'Rskmin',
  age: 6,
  hobby: '爱好-编程'
})
```

- new 一个文档

```js
let student = new Student({
  username: 'Rskmin',
  age: 6,
  hobby: '爱好-编程'
})
let r = await student.save()
```

- 批量增加

```js
// 放到数组中一次性添加只执行一次数据库操作
let arr = []
for (let i = 0; i < 30; i++) {
  arr.push({username: 'rskmin' + i})
}
await Student.create(arr)
```

#### 查询

- 列表查询

```js
  let currentSize = 3 // 当前页数
  let limit = 3 // 每页大小
  // 查找Student集合中所有数据，跳过两页的文档数量，限制显示3个，排序
  let arr = await Student.find({}).skip((currentSize - 1) * limit).limit(limit).sort()
```

- 聚合查询

```js
  // 聚合查询, 自由关联表结构
  let homework = await HomeWork.aggregate([
    {
      $lookup: { // 查询
        from: 'student', // 关联的集合
        localField: 'studentId', // 本集合关联字段
        foreignField: '_id', // 外链字段
        as: 'student' // 重命名
      }
    },
    {
      $match: { // 匹配规则
        _id: ObjectId('5f276e5ad118d034144e5550')
      }
    }
  ])
  console.log(JSON.stringify(homework, null, 2))
```

## redis

> Redis 是完全开源免费的，遵循BSD协议，是一个高性能的key-value数据库

### ### 操作

```js
const redis = require('redis');

// 连接数据库
let client = redis.createClient(6379, '127.0.0.1')
let client = redis.createClient(6379, '127.0.0.1')

// 增加、获取数据
// client.set(key, val, callback)
;(async () => {
  client.set('name', 'rskmin', redis.print)
  await client.get('name', redis.print)
})()

// client1 订阅消息
client1.subscribe('call')
client1.on('message', function (channel, message) {
    console.log(message)
})
// client2 发布消息
client2.publish('call', 'hhhh')
```

