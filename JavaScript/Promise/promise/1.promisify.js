// promisify: 把一个node中的api 转换成promise的写法

const fs = require('fs')
// const util = require('util')

// let read = util.promisify(fs.readFile)

// read('./1.promise.js', 'utf8').then(data => {
//   console.log(data)
// })

const promisify = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, function(err, data) {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  }
}

const promisifyAll = (target) => {
  Reflect.ownKeys(target).forEach(key => {
    if (typeof target[key] === 'function') {
      target[key+'Async'] = promisify(target[key])
    }
  })
  return target
}

const newFs = promisifyAll(fs)
newFs.readFileAsync('../test.txt', 'utf8').then(data => {
  console.log(data)
})