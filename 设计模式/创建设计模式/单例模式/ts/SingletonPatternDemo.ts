import SingleObject from './SingleObject'


// 构造函数是私有的，无法访问
// const object = new SingleObject()

const object = SingleObject.getInstance()

object.showMessage()

const object1 = SingleObject.getInstance()

console.log(object === object1)