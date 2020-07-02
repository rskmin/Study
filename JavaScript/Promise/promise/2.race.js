// const fs = require('fs').promises

// let readFiles = [
//   fs.readFile('./1.promise.js', 'utf8'),
//   fs.readFile('../test.txt', 'utf8')
// ]

// Promise.race(readFiles).then(data => {
//   console.log(data)
// }).catch(err => {
//   console.log(err)
// })
Promise = require('./promise')

let promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, 3000)
})

function wrap(_promise) {// 包装一个可中断的promise(替换掉当前的promise)
  let abort
  let newPromise = new Promise((resolve, reject) => {
    abort = reject
  })
  let p = Promise.race([_promise, newPromise])
  p.abort = abort
  return p
}

let newPromise = wrap(promise)
setTimeout(() => {
  newPromise.abort('超时了')
}, 1000)
newPromise.then((data => {
  console.log('成功' + data)
})).catch(e => {
  console.log('失败' + e)
})