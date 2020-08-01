import { TriggerOpTypes } from './operations'
import { isArray } from '../shared'

const effectStack = []
let activeEffect

let uid = 0

/**
 * 创建响应式方法 - 响应式追踪函数依赖，并在依赖变更时运行该函数
 * @param {*} fn - 被追踪的函数
 * @param {*} options - 设置
 */
function createReactiveEffect(fn, options = {}) {
  const effect = function reactiveEffect() {
    if (!effectStack.includes(effect)) {
      try {
        effectStack.push(effect)
        activeEffect = effect
        return fn()
      } finally {
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }

  effect.id = uid++
  effect.options = options
  effect.deps = []
  return effect
}

/**
 * 响应式API
 * @param {*} fn - 被追踪的函数
 * @param {*} options - 设置
 */
export function effect(fn, options = {}) {
  const effect = createReactiveEffect(fn, options)

  if (!options.lazy) { // 默认执行一次
    effect()
  }

  return effect
}


const targetMap = new WeakMap()
/**
 * 依赖收集 - 为响应对象触发的属性收集依赖
 * @param {*} target - 响应对象
 * @param {*} type
 * @param {*} key - 触发的属性
 */
export function track(target, type, key) {
  if (activeEffect === undefined) { // 确保只有在执行 effect 时才收集依赖
    return
  }

  let depsMap = targetMap.get(target) // 检查该响应对象是否收集过依赖

  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key) // 检查触发的属性是否收集过依赖
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

/**
 * 触发响应函数
 * @param {*} target
 * @param {*} type - 触发类型
 * @param {*} [ key ] - 触发属性
 * @param {*} [ newValue ] - 新值
 * @param {*} [ oldValue ] - 旧值
 * @param {*} [ oldTarget ]
 */
export function trigger(target, type, key, newValue, oldValue, oldTarget) {
  console.log(type, key)
  const depsMap = targetMap.get(target) // 获取响应对象的依赖map

  if (!depsMap) { // 未收集过依赖
    return
  }

  const effects = new Set()
  /**
   * 获取要触发的依赖，阻止循环触发
   * @param {Set} effectsToAdd - 依赖集合
   */
  const add = effectsToAdd => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect => {
        if (effect !== activeEffect) {
          effects.add(effect)
        }
      })
    }
  }

  if (key !== void 0) {
    add(depsMap.get(key))
  }

  const isAddOrDelete =
    type === TriggerOpTypes.ADD ||
    (type === TriggerOpTypes.DELETE && !isArray(target))

  if (isAddOrDelete) { // 数组length属性依赖
    add(depsMap.get(isArray(target) ? 'length' : ''))
  }

  const run = effect => {
    effect()
  }

  effects.forEach(run)

}
