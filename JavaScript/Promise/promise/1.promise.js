// Promise 是一个带有 then 方法的 object 或一个 function

// 1. executor 执行器 默认会立即执行
// 2. 默认promise的状态是等待状态 (三个状态 等待 成功 失败)
// 3. 当调用resolve时 会编程成功态 调用reject 会编程失败态
// 4. 返回的实例上有一个then方法，then中需要提供两个参数， 分别是成功对应的函数和失败对应的函数
// 5. 如果同时调用成功和失败，默认会采取第一次调用的结果
// 6. 抛出异常就走失败逻辑
// 7. 成功可以传入成功的原因， 失败可以传入失败的原因
let Promise = require('./promise')
let promise = new Promise((resolve, reject) => {
  // resolve('ok')
  // reject('ok')
  // throw new Error('出错')
  setTimeout(() => {
    resolve('ok')
    // reject('ok')
  }, 1000)
})

let promise2 = promise.then(val => {
  console.log('success', val)
  return new Promise((resolve) => {
    resolve(new Promise((resolve1) => {
      resolve1('yes')
    }))
  })
}, reason => {
  console.log('fail', reason)
})

promise2.then(data => {
  console.log('success', data)
}, err => {
  console.log('fail', err)
})


