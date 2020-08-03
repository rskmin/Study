import { observe } from './observer/index'
import { proxy } from './utils'

function initProps() {}
function initMethods() {}
function initData(vm) {
  let data = vm.$options.data
  vm._data = data = typeof data == 'function' ? data.call(vm) : data

  // 将data的属性代理到vm上
  for (let key in data) {
    proxy(vm, '_data', key)
  }

  // 数据的劫持方案 Object.defineProperty 对象处理
  observe(data)
}
function initComputed() {}
function initWatch() {}

/**
 * 初始化状态 - 数据劫持
 * @param {object} vm - Vue实例
 */
export function initState(vm) {
  const opts = vm.$options
  if (opts.props) {
    initProps(vm)
  }
  if (opts.methods) {
    initMethods(vm)
  }
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}
