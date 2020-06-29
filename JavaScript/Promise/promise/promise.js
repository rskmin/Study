/* eslint-disable no-param-reassign */
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
  static all(values) {
    return new Promise((resolve, reject) => {
      let resultArr = []
      let orderIndex = 0
      const processResultByKey = (value, index) => {
        resultArr[index] = value
        if (++orderIndex === values.length) {
          resolve(resultArr)
        }
      }
      for (let i = 0, len = values.length; i < len; i++ ) {
        let value = values[i]
        if (value && typeof value.then === 'function') {
          // 如果其中一个Promise则直接调用返回的promise的reject
          value.then(val => {
            processResultByKey(val, i)
          }, reject)
        } else {
          processResultByKey(value, i)
        }
      }
    })
  }
}

// promises-aplus-tests
Promise.deferred = function() {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
Promise.resolved = function(value) {
  return Promise.resolve(value)
}
Promise.rejected = function(reason) {
  return Promise.reject(reason)
}
module.exports = Promise