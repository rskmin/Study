# Promise

## 高阶函数

> 高阶函数满足两个特点其一

### 特点

1. 函数的参数中有函数

2. 函数返回了一个函数

### before 方法 - 函数劫持

``````js
Function.prototype.before = function(callback) {
  return (...args) => {
    callback()
    this(...args)
  }
}

function say(a, b, c, d) {
  console.log('说话', a, b, c, d)
}
let newSay = say.before(() => {
  console.log('说话前')
})

// 说话前
// 说话 1 2 3 4
newSay(1, 2, 3, 4)
``````

### 函数柯里化(curry) - 细化函数功能

>通用柯里化函数(比较传入参数个数，达到个数就执行函数，未达到则继续收集参数)

``````js
const currying = (fn, arr = []) => {
  let len = fn.length// 函数的参数个数
  return (...args) => {
    const concatArgs = [...arr, ...args]
    if (concatArgs.length < len) {// 未达到参数数量，递归收集
      return currying(fn, concatArgs)
    }
    // 达到数量, 执行原函数
    return fn(...concatArgs)
  }
}

function log(a, b, c, d) {
  console.log(a, b, c, d)
}
const curryLog = currying(log)
curryLog(1, 2)(3)(4)
``````

## 发布订阅和观察者模式

## 实现

[promise/A+规范](https://promisesaplus.com/)

### 主要功能

#### 实现过程

> 同步逻辑

<mark>Promise 是一个带有 then 方法的 object 或一个 function</mark>

``````js
class Promise {
  then(onFulfilled, onRejected) {
  }
}
``````

<mark>Promise 接受一个参数 executor 执行器 默认会立即执行</mark>

``````js
class Promise {
  /**
   * @param {function} executor - 执行器
   */
  constructor(executor) {
    executor()
  }
  then(onFulfilled, onRejected) {
    console.log(onFulfilled, onRejected)
  }
}
``````

<mark>一个 Promise 必须处于以下三种状态之一： pending, fulfilled, rejected, 默认处于等待态</mark>

``````js
const ENUM = {
  PENDING: 'PENDING',// 等待
  FULFILLED: 'FULFILLED',// 成功
  REJECTED: 'REJECTED'// 失败
}

class Promise {
  /**
   * @param {function} executor - 执行器
   */
  constructor(executor) {
    this.status = ENUM.PENDING// 默认等待态
    executor()
  }
  then(onFulfilled, onRejected) {
    console.log(onFulfilled, onRejected)
  }
}
``````

<mark>executor 接受了两个参数 成功的回调和失败的回调</mark>

``````js
const ENUM = {
  PENDING: 'PENDING',// 等待
  FULFILLED: 'FULFILLED',// 成功
  REJECTED: 'REJECTED'// 失败
}

class Promise {
  /**
   * @param {function} executor - 执行器
   */
  constructor(executor) {
    this.status = ENUM.PENDING// 默认等待态

    const resolve = value => {// 成功回调

    }
    const reject = reason => {// 失败回调

    }

    executor(resolve, reject)
  }
  then(onFulfilled, onRejected) {
    console.log(onFulfilled, onRejected)
  }
}
``````

<mark>当 Promise 状态为 pending 时 可以转变为 fulfilled 或 rejected 状态</mark>

<mark>当 Promise 状态为 fulfilled 时 不能转变为其他状态， 必须接收一个不能被改变的 value 可以是任意合法的JS值</mark>

<mark>当 Promise 状态为 rejected 时 不能转变为其他状态， 必须接收一个不能被改变的 reason 指出失败原因</mark>

``````js
const ENUM = {
  PENDING: 'PENDING',// 等待
  FULFILLED: 'FULFILLED',// 成功
  REJECTED: 'REJECTED'// 失败
}

class Promise {
  /**
   * @param {function} executor - 执行器
   */
  constructor(executor) {
    this.status = ENUM.PENDING// 默认等待态

    const resolve = value => {// 成功回调
      if (this.status === ENUM.PENDING) {// 处于 pending 状态才能改变状态
        this.status = ENUM.FULFILLED
        this.value = value
      }
    }
    const reject = reason => {// 失败回调
      if (this.status === ENUM.PENDING) {
        this.status = ENUM.REJECTED
        this.reason = reason
      }
    }

    executor(resolve, reject)
  }
  then(onFulfilled, onRejected) {
    console.log(onFulfilled, onRejected)
  }
}
``````

<mark>当执行抛出异常就走失败逻辑</mark>

``````js
//...

class Promise {
  //...

    try {
      executor(resolve, reject)
    } catch (e) {// 捕获到异常就走失败逻辑
      reject(e)
    }
  }
  //...
}
``````

<mark>Promise 成功时执行成功回调 onFulfilled 传入成功值, 失败时执行失败回调 onRejected 传入失败值</mark>

``````js
//...

class Promise {
  // ...

  then(onFulfilled, onRejected) {
    if (this.status === ENUM.FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === ENUM.REJECTED) {
      onRejected(this.reason)
    }
  }
}
``````

> 异步逻辑

利用发布订阅实现异步逻辑

``````js
//...

class Promise {
  constructor(executor) {
    this.status = ENUM.PENDING
    this.onResolvedCallbacks = []// 成功的回调队列
    this.onRejectedCallbacks = []// 失败的回调队列

    const resolve = value => {
      if (this.status === ENUM.PENDING) {
        this.status = ENUM.FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())// 发布成功事件,执行成功的回调队列
      }
    }
    const reject = reason => {
      if (this.status === ENUM.PENDING) {
        this.status = ENUM.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())// 发布失败事件,执行失败的回调队列
      }
    }

    //...
  }
  then(onFulfilled, onRejected) {
    //...

    if (this.status === ENUM.PENDING) {
      // resolve 或 reject 方法还未被调用
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)// 订阅成功事件
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)// 订阅失败事件
      })
    }
  }
}
``````

<mark>then 必须返回一个 Promise(promise2), promise2 需要根据 promise1 回调返回的结果(x)确定状态, 通过承诺解决程序(resolvePromise)解决 x 和 promise2 状态的问题</mark>

``````js
//...

const resolvePromise = (x, promise2, resolve, reject) => {
  // TODO:
}
class Promise {

  //...

  then(onFulfilled, onRejected) {
       // 调用 then 方法 创建一个新的 promise
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === ENUM.FULFILLED) {
        // 异步逻辑保证 promise2 已被创建
        setTimeout(() => {
          let x = onFulfilled(this.value)
          resolvePromise(x, promise2, resolve, reject)
        }, 0)
      }
      if (this.status === ENUM.REJECTED) {
        setTimeout(() => {
          let x = onRejected(this.reason)
          resolvePromise(x, promise2, resolve, reject)
        }, 0)
      }
      if (this.status === ENUM.PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            let x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            let x = onRejected(this.reason)
            resolvePromise(x, promise2, resolve, reject)
          }, 0)
        })
      }
    })

    return promise2
  }
}
``````

<mark>promise.then 回调抛出异常， 则走 promise2 的失败逻辑</mark>

``````js
//ENUM...

class Promise {
  //constructor...

  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === ENUM.FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {// 捕获异常走失败逻辑
            reject(e)
          }
        }, 0)
      }
      if (this.status === ENUM.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === ENUM.PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })

    return promise2
  }
}
``````

<mark>如果 promise2 和 x 指向同一个对象，则走失败逻辑 将 TypeError 作为 reason</mark>

``````js
//ENUM...

const resolvePromise = (x, promise2, resolve, reject) => {
  if (x === promise2) {
    reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
  }
}

//Promise...
``````

<mark>x 不是 object 或 function 则走成功逻辑, 将 x 作为value</mark>

``````js
//ENUM...

const resolvePromise = (x, promise2, resolve, reject) => {
  if (x === promise2) {
    reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    //TODO:
  } else {
    resolve(x)
  }
}

//Promise...
``````

<mark>设置 let then = x.then 若报错则走失败逻辑， 将错误作为 reason</mark>

``````js
//ENUM...

const resolvePromise = (x, promise2, resolve, reject) => {
  if (x === promise2) {
    reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
  }
  if (typeof x === 'object' && x !== null || typeof x === 'function') {
    try {
      let then = x.then
    } catch (e) {
      reject(e)
    }
  } else {
    resolve(x)
  }
}

//Promise...
``````

<mark>如果 then 不是 function 则走成功逻辑 x 作为 value</mark>

``````js
//ENUM...

const resolvePromise = (x, promise2, resolve, reject) => {
  if (x === promise2) {
    reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
  }
  if (typeof x === 'object' && x !== null || typeof x === 'function') {
    try {
      let then = x.then
      if (typeof then === 'function') {
        //TODO: promise
      } else {
        resolve(x)
      }
    } catch (e) {
      reject(e)
    }
  } else {
    resolve(x)
  }
}

//Promise...
``````

<mark>如果 then 是 function 则通过 call(x) 调用 then, 此时已认定 x 为 promise，通过订阅成功和失败两个事件获取 x 的状态</mark>

``````js
//ENUM...

const resolvePromise = (x, promise2, resolve, reject) => {
  if (x === promise2) {
    reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
  }
  if (typeof x === 'object' && x !== null || typeof x === 'function') {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          // y 可能是一个promise
          // 递归解析 y 的值
          resolvePromise(y, promise2, resolve, reject)
        }, r => {
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      reject(e)
    }
  } else {
    resolve(x)
  }
}

//Promise...
``````

<mark>确保 reject 和 resolve 只有一个被调用</mark>

``````js
//ENUM...

const resolvePromise = (x, promise2, resolve, reject) => {
  if (x === promise2) {
    reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
  }
  if (typeof x === 'object' && x !== null || typeof x === 'function') {
    let called
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) {// 被调用过就返回
            return
          }
          called = true
          resolvePromise(y, promise2, resolve, reject)
        }, r => {
          if (called) {
            return
          }
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) {
        return
      }
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

//Promise...
``````

#### 主要功能代码

``````js
const ENUM = {
  PENDING: 'PENDING',// 等待
  FULFILLED: 'FULFILLED',// 成功
  REJECTED: 'REJECTED'// 失败
}

const resolvePromise = (x, promise2, resolve, reject) => {
  if (x === promise2) {
    reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
  }
  if (typeof x === 'object' && x !== null || typeof x === 'function') {
    let called
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) {
            return
          }
          called = true
          // y 可能是一个promise
          // 递归解析 y 的值
          resolvePromise(y, promise2, resolve, reject)
        }, r => {
          if (called) {
            return
          }
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) {
        return
      }
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

class Promise {
  /**
   * @param {function} executor - 执行器
   */
  constructor(executor) {
    this.status = ENUM.PENDING// 默认等待态
    this.onResolvedCallbacks = []// 成功的回调队列
    this.onRejectedCallbacks = []// 失败的回调队列

    const resolve = value => {// 成功回调
      if (this.status === ENUM.PENDING) {// 处于 pending 状态才能改变状态
        this.status = ENUM.FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())// 执行成功的回调队列
      }
    }
    const reject = reason => {// 失败回调
      if (this.status === ENUM.PENDING) {
        this.status = ENUM.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())// 执行失败的回调队列
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {// 捕获到异常就走失败逻辑
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : err => {
      throw err
    }
    // 调用 then 方法 创建一个新的 promise
    let promise2 = new Promise((resolve, reject) => {
      // 根据 x 的状况判断是调用 resolve 还是 reject
      if (this.status === ENUM.FULFILLED) {
        // 异步逻辑保证 promise2 已被创建
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === ENUM.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === ENUM.PENDING) {
        // resolve 或 reject 方法还未被调用
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })

    return promise2
  }
}
``````

### Promise方法实现

#### catch 方法

``````js
//ENUM...
//resolvePromise...

class Promise {
  //constructor...
  //then...
  catch(errCallback) {
    return this.then(null, errCallback)
  }
}
``````

#### resolve 方法 和 reject 方法

``````js
//ENUM...
//resolvePromise...

class Promise {
  constructor(executor) {

    //...

    const resolve = value => {// 成功回调

      // 如果 value 是一个 promise，需要进行递归解析
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }

      //...
    }
  }
  //then...
  //catch...
  static resolve(value) {
    return new Promise(resolve => {
      resolve(value)
    })
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
}
``````

#### finally 方法

``````js
//ENUM...
//resolvePromise...

class Promise {
  //constructor...
  //then...
  //catch...
  finally(callback) {
    return this.then(value => {
      return Promise.resolve(callback()).then(() => value)
    }, err => {
      return Promise.resolve(callback()).then(() => {
        throw err
      })
    })
  }
  //resolve
  //reject
}
``````

#### all 方法

``````js
//ENUM...
//resolvePromise...

class Promise {
  //constructor...
  //then...
  //catch...
  //finally...
  //resolve...
  //reject...
  static all(promises) {
    // 计数收集promise的状态，收集完调用resolve传入收集内容，遇到失败状态则调用reject
    return new Promise((resolve, reject) => {
      let resultArr = []
      let orderIndex = 0
      const processResultByKey = (value, index) => {
        resultArr[index] = value
        if (++orderIndex === promises.length) {
          resolve(resultArr)
        }
      }
      for (let i = 0, len = promises.length; i < len; i++ ) {
        let current = promises[i]
        if (isPromise(current)) {
          // 如果其中一个Promise则直接调用返回的promise的reject
          current.then(val => {
            processResultByKey(val, i)
          }, reject)
        } else {
          processResultByKey(current, i)
        }
      }
    })
  }
}
``````

#### race 方法

``````js
//ENUM...
//resolvePromise...

class Promise {
  //constructor...
  //then...
  //catch...
  //finally...
  //resolve...
  //reject...
  //all...
  static race(promises) {
    // 谁先返回 就用谁
    return new Promise((resolve, reject) => {
      // 一起执行就是 for
      for (let i = 0; i < promises.length; i++) {
        let current = promises[i]
        if (isPromise(current)) {
          current.then(resolve, reject)
        } else {
          resolve(current)
        }
      }
    })
  }
}
``````


### 完整代码

``````js
const ENUM = {
  PENDING: 'PENDING',// 等待
  FULFILLED: 'FULFILLED',// 成功
  REJECTED: 'REJECTED'// 失败
}

const isPromise = value => {
  if (typeof value === 'object' && value !== null || typeof value === 'function') {
    return typeof value.then === 'function'
  }
}

const resolvePromise = (x, promise2, resolve, reject) => {
  if (x === promise2) {
    reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
  }
  if (typeof x === 'object' && x !== null || typeof x === 'function') {
    let called
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) {
            return
          }
          called = true
          // y 可能是一个promise
          // 递归解析 y 的值
          resolvePromise(y, promise2, resolve, reject)
        }, r => {
          if (called) {
            return
          }
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) {
        return
      }
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

class Promise {
  /**
   * @param {function} executor - 执行器
   */
  constructor(executor) {
    this.status = ENUM.PENDING// 默认等待态
    this.onResolvedCallbacks = []// 成功的回调队列
    this.onRejectedCallbacks = []// 失败的回调队列

    const reject = reason => {// 失败回调
      if (this.status === ENUM.PENDING) {
        this.status = ENUM.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())// 执行失败的回调队列
      }
    }
    const resolve = value => {// 成功回调

      // 如果 value 是一个 promise，需要进行递归解析
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }

      if (this.status === ENUM.PENDING) {// 处于 pending 状态才能改变状态
        this.status = ENUM.FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())// 执行成功的回调队列
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {// 捕获到异常就走失败逻辑
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : err => {
      throw err
    }
    // 调用 then 方法 创建一个新的 promise
    let promise2 = new Promise((resolve, reject) => {
      // 根据 x 的状况判断是调用 resolve 还是 reject
      if (this.status === ENUM.FULFILLED) {
        // 异步逻辑保证 promise2 已被创建
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === ENUM.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === ENUM.PENDING) {
        // resolve 或 reject 方法还未被调用
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })

    return promise2
  }
  catch(errCallback) {
    return this.then(null, errCallback)
  }
  finally(callback) {
    return this.then(value => {
      return Promise.resolve(callback()).then(() => value)
    }, err => {
      return Promise.resolve(callback()).then(() => {
        throw err
      })
    })
  }
  static resolve(value) {
    return new Promise(resolve => {
      resolve(value)
    })
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
  static all(promises) {
    return new Promise((resolve, reject) => {
      let resultArr = []
      let orderIndex = 0
      const processResultByKey = (value, index) => {
        resultArr[index] = value
        if (++orderIndex === promises.length) {
          resolve(resultArr)
        }
      }
      for (let i = 0, len = promises.length; i < len; i++ ) {
        let current = promises[i]
        if (isPromise(current)) {
          // 如果其中一个Promise则直接调用返回的promise的reject
          current.then(val => {
            processResultByKey(val, i)
          }, reject)
        } else {
          processResultByKey(current, i)
        }
      }
    })
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      // 谁先返回 就用谁
      // 一起执行就是 for
      for (let i = 0; i < promises.length; i++) {
        let current = promises[i]
        if (isPromise(current)) {
          current.then(resolve, reject)
        } else {
          resolve(current)
        }
      }
    })
  }
}
``````

## 运用

### Promise 实现超时中断

>抛弃本次请求，返回一个失败的 Promise

``````js
let promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, 3000)
})

function wrap(_promise) {// 包装一个可中断的promise
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
``````