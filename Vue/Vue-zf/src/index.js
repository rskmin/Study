import { initMixin } from './init'

function Vue(options) {
  this._init(options)
}

// 扩展了初始化功能
initMixin(Vue)

export default Vue