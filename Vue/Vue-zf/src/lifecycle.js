import { patch } from './vdom/patch'

/**
 * Vue生命周期扩展
 * @param {object} Vue - Vue 实例
 */
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this
    patch(vm.$el, vnode)
  }
}

/**
 * 挂载Vue组件
 * @param {object} vm - Vue 实例
 * @param {string} el - 挂载点
 */
export function mountComponent(vm, el) {
  // 调用render方法去渲染 el 属性

  callHook(vm, 'beforeMount')
  // 先调用 render 方法创建虚拟节点，再将虚拟节点渲染到页面上
  vm._update(vm._render())
  callHook(vm, 'mounted')
}

/**
 * 调用生命周期钩子
 * @param {object} vm - Vue 实例
 * @param {string} hook - 钩子名称
 */
export function callHook(vm, hook) {
  const handlers = vm.$options[hook]
  if (handlers) {
    for (let i = 0, len = handlers.length; i < len; i++) {
      handlers[i].call(vm)
    }
  }
}