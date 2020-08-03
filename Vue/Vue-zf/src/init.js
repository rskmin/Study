import { initState } from './state'

/**
 * Vue初始化功能扩展插件
 * @param {object} Vue - Vue构造函数
 */
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options

    // 初始化状态(数据劫持，当数据改变时更新视图)
    initState(vm)
  }
}