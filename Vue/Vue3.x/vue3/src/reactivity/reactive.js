import { isObject } from '../shared'
import { mutableHandlers } from './baseHandlers'

/**
 * 创建响应式对象
 * @param {Object | Array | Set | Map} target
 * @param {Object} baseHandler
 */
function createReactiveObject(target, baseHandler) {
  if (!isObject(target)) { // 不是对象直接返回
    return target
  }
  const observed = new Proxy(
    target,
    baseHandler
  )
  return observed
}

/**
 * 响应式API
 * @param {Object | Array | Set | Map} target
 */
export function reactive(target) {
  return createReactiveObject(
    target,
    mutableHandlers
  )
}
