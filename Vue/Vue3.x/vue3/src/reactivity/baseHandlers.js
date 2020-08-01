import { isObject, hasOwn, hasChanged } from '../shared'
import { reactive } from './reactive'
import { track, trigger } from './effect'
import { TriggerOpTypes } from './operations'

function createGetter() {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver)

    track(target, 'get', key) // 依赖收集
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
      trigger(target, TriggerOpTypes.ADD, key, value)
    } else if (hasChanged(value, oldValue)) { // 对属性值修改
      trigger(target, TriggerOpTypes.SET, key, value) // 触发依赖更新
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