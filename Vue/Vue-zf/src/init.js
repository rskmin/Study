import { initState } from './state'
import { compileToFunctions } from './compiler/index'
import { mountComponent, callHook } from './lifecycle'
import { mergeOptions } from './utils'

/**
 * Vue初始化功能扩展插件
 * @param {object} Vue - Vue构造函数
 */
export function initMixin(Vue) {
  /**
   * 初始化方法
   * @param {object} options
   */
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = mergeOptions(vm.constructor.options, options)

    callHook(vm, 'beforeCreate')
    // 初始化状态(数据劫持，当数据改变时更新视图)
    initState(vm)
    callHook(vm, 'created')

    // 如果当前有el属性说明要渲染模板
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  /**
   * 挂载节点方法
   * @param {string} params - 挂载点
   */
  Vue.prototype.$mount = function (el) {
    const vm = this
    const options = vm.$options
    // 获取挂载节点
    el = document.querySelector(el)
    vm.$el = el

    // 判断有没有render方法
    if (!options.render) { // 无render
      // 将template转换成render方法

      let template = options.template
      if (!template && el) { // 无template
        // 使用挂载点作为模板
        template = el.outerHTML
      }
      // 编译原理 将模板编译成render函数
      const render = compileToFunctions(template)
      options.render = render
    }
    // 有render(用户写的或者是使用模板编译出来的)

    // 挂载组件
    mountComponent(vm, el)

  }
}