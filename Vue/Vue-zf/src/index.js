import { initMixin } from './init'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './vdom/index'
import { initGlobalApi } from './global-api/index'

/**
 * Vue 构造函数
 * @param {*} options
 */
function Vue(options) {
  this._init(options) // 组件初始化入口
}

/**
 * 通过插件的方式将Vue的初始化方法扩展到Vue原型上
 */
// 扩展了初始化功能
initMixin(Vue) // _init
// 扩展了生命周期相关(更新 + 挂载)
lifecycleMixin(Vue) // _update
// 扩展了Vue的渲染方法
renderMixin(Vue) // _render

/**
 * 静态方法 Vue.component Vue.directive Vue.extend Vue.mixin
 */
initGlobalApi(Vue)

export default Vue