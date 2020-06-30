// @flag
// class Animal {
//   PI = 3.14
//   name = 'xxx'// 实例上的属性
//   say() {
//     console.log('说话')
//   }
// }

// function flag(target) {
//   target.type = '哺乳类'
// }

// function readonly(target, name, descriptor) {
//   descriptor.writable = false
//   return descriptor
// }

// class Person {
//   constructor() {
//     this.first = 'A'
//     this.last = 'B'
//   }

//   @readonly
//   name() {
//     return `${this.first} ${this.last}`
//   }
// }

import { readonly } from 'core-decorators'

class Math {
  @readonly
  add(a, b) {
    return a + b
  }
}

new Math().add = 1