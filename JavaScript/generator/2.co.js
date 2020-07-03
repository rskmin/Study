const fs = require('fs').promises

function co(it) {// exec generator 执行 generator
  return new Promise((resolve, reject) => {
    function next(_data) {
      let { value, done } = it.next(_data)
      if (!done) {
        // 将返回值包装成 Promise 以便继续链式调用
        Promise.resolve(value).then(data => {
          next(data)
        }, reject)
      } else {
        resolve(value)
      }
    }
    next()
  })
}

// co - generator 自动执行器
// async 方法 等于 generator 方法
// 执行 async 方法 等于 co(generator())

// function* generator() {
//   let a = yield fs.readFile('../test.txt', 'utf8')
//   let b = yield fs.readFile(a, 'utf8')
//   return b
// }

// co(generator()).then(data => {
//   console.log(data)
// })

// async+await(语法糖) 封装了 generator 和 co
async function generator() {
  let a = await fs.readFile('../test.txt', 'utf8')
  let b = await fs.readFile(a, 'utf8')
  return b
}
generator().then(data => {
  console.log(data)
})