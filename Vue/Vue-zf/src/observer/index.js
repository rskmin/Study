import { arrayMethods } from './array'
import { defineProperty } from '../utils'

/**
 * 劫持对象
 * @param {object} data
 * @param {*} key
 * @param {*} value
 */
function defineReactive(data, key, value) {
  observe(value) // 递归劫持
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue == value) return
      observe(newValue) // 如果新值是个对象也要拦截
      value = newValue
    }
  })
}

/**
 * 封装对属性进行观测的类
 */
class Observer {
  constructor(value) {
    // 判断一个对象是否被观测过可以查看有没有没 __ob__
    defineProperty(value, '__ob__', this)

    // 使用 defineProperty 重新定义属性
    if (Array.isArray(value)) { // 数组函数劫持(切片编程)
      Object.setPrototypeOf(value, arrayMethods)
      this.observeArray(value) // 观测数组中的对象类型
    } else { // 对象属性劫持
      this.walk(value)
    }
  }
  observeArray(value) {
    value.forEach(item => observe(item))
  }
  walk(data) {
    let keys = Object.keys(data)
    keys.forEach(key => {
      // 定义成响应数据
      defineReactive(data, key, data[key])
    })
  }
}

export function observe(data) {
  if (typeof data !== 'object' && data !== null) { // 确保必须是对象
    return data
  }
  if (data.__ob__) {
    return data
  }
  return new Observer(data)
}