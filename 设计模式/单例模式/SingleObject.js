
const SingleObject = (function() {
  let instance
  class _SingleObject {
    // 阻止实例化单例对象
    constructor() {
      if (instance) {
        throw new Error('单例组件无法实例化')
      }
    }
    static getInstance() {
      return instance
    }
    showMessage() {
      console.log('Hello World!')
    }
  }
  instance = new _SingleObject()
  return _SingleObject
})()

const object = SingleObject.getInstance()
object.showMessage()
const object1 = SingleObject.getInstance()
console.log(object === object1)
// const object2 = new SingleObject('single')
