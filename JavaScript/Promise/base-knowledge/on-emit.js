const fs = require('fs')

const event = {
  _arr: [],
  on(fn) {// 订阅事件
    this._arr.push(fn)
  },
  emit() {// 发布事件
    this._arr.forEach(fn => fn())
  }
}

const obj = {}
event.on(function() {// 计划 1
  console.log('数据来了')
})
event.on(function() {// 计划 2
  if (Object.keys(obj).length === 2) {
    console.log(obj)
  }
})

fs.readFile('./name.txt', 'utf8', (err, data) => {
  obj.age = data
  event.emit()
})

fs.readFile('./age.txt', 'utf8', (err, data) => {
  obj.name = data
  event.emit()
})
