import { isObject, hasOwn, hasChanged } from '../shared'
import { reactive } from './reactive'

function createGetter() {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver)

    console.log('Get', target, key)
    if (isObject(res)) {
      return reactive(res)
    }

    return res
  }
}

const get = createGetter()

function createSetter() {
  return function set(target, key, value, receiver) {
    const oldValue = target[key]

    const hadKey = hasOwn(target, key)
    const result = Reflect.set(target, key, value, receiver)

    if (!hadKey) { // 属性的新增操作
      console.log('新增操作', target, key)
    } else if (hasChanged(value, oldValue)) { // 对属性值修改
      console.log('修改操作', target, key)
    }

    return result
  }
}
const set = createSetter()


// 拦截普通对象和数组的处理
export const mutableHandlers = {
  get,
  set
  // deleteProperty,
  // has,
  // ownKeys
}