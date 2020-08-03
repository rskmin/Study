// 获取数组原型上的方法
let oldArrayProtoMethods = Array.prototype

// 继承方法
export let arrayMethods = Object.create(oldArrayProtoMethods)

let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'split'
]

methods.forEach(methods => {
  arrayMethods[methods] = function (...args) {
    console.log('数组方法被调用了')
    const result = oldArrayProtoMethods[methods].apply(this, args)
    let inserted
    let ob = this.__ob__

    switch (methods) {
    case 'push':
    case 'unshift':
      inserted = args
      break
    case 'slice':
      inserted = args.slice(2)
      break
    default: break
    }

    if (inserted) ob.observeArray(inserted)

    return result
  }
})