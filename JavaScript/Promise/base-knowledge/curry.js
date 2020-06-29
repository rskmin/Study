// 函数柯里化

// 类型判断
// 1. typeof 基本类型类型判断(不能区分引用类型)
// 2. constructor 可以判断这个实例是通过谁构造出来的
// 3. instanceof 引用类型类型判断(根据原型链判断 __proto__)
// 4. Object.prototype.toString.call(obj) 区分具体的类型 (不能区分实例)

// function isType(content, type) {
//   return Object.prototype.toString.call(content) === `[object ${type}]`
// }
// console.log(isType('123', 'String'))

// 细化函数功能 (柯里化作用)
// const isType = (type) => value => {
//   return Object.prototype.toString.call(value) === `[object ${type}]`
// }

// let util = {}
// ;['String', 'Number', 'Null', 'Undefined'].forEach(type => {
//   util[`is${type}`] = isType(type)
// })
// console.log(util.isNumber(123))

const currying = (fn, arr = []) => {
  let len = fn.length// 函数的参数个数
  return (...args) => {
    const concatArgs = [...arr, ...args]
    if (concatArgs.length < len) {
      return currying(fn, concatArgs)
    }
    return fn(...concatArgs)
  }
}

function log(a, b, c, d) {
  console.log(a, b, c, d)
}

const curryLog = currying(log)
curryLog(1, 2)(3)(4)