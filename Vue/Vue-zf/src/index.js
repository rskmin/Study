import { initMixin } from './init'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './vdom/index'

function Vue(options) {
  this._init(options)
}

// 扩展了初始化功能
initMixin(Vue)
// 扩展了生命周期
lifecycleMixin(Vue)
// 扩展了Vue的渲染方法
renderMixin(Vue)

export default Vue