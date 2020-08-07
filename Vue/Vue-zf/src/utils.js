/* eslint-disable no-prototype-builtins */
export function proxy(vm, data, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[data][key]
    },
    set(newValue) {
      vm[data][key] = newValue
    }
  })
}

export function defineProperty(target, key, value) {
  Object.defineProperty(target, key, {
    enumerable: false,
    configurable: false,
    value
  })
}

export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestory',
  'destoryed'
]

const strats = {}
strats.data = function (parentVal, childVal) {
  return childVal
}
strats.computed = function () { }
strats.watch = function () { }
function mergeHook(parentVal, childVal) {
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal)
    }
    return [childVal]
  }
  // 没有儿子, 不合并
  return parentVal
}

LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})

export function mergeOptions(parent, child) {
  const options = {}

  for (let key in parent) { // 父亲和儿子都有的
    mergeField(key)
  }

  for (let key in child) { // 父亲没有儿子有
    if (!parent.hasOwnProperty(key)) {
      mergeField(key)
    }
  }

  function mergeField(key) { // 合并字段
    if (strats[key]) {
      options[key] = strats[key](parent[key], child[key])
    } else {
      // 默认合并
      options[key] = child[key]
    }
  }

  return options
}