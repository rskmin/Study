/**
 * Vue渲染的扩展
 * @param {object} Vue - Vue 实例
 */
export function renderMixin(Vue) {
  Vue.prototype._c = function () { // 创建虚拟dom元素
    return createElement(...arguments)
  }
  Vue.prototype._s = function (val) { // 获取插值内容并转化为字符串
    return val == null ? '' : (typeof val == 'object') ? JSON.stringify(val) : val
  }
  Vue.prototype._v = function (text) { // 创建虚拟dom文本元素
    return createTextVnode(text)
  }
  Vue.prototype._render = function () { // _render = render
    const vm = this
    const render = vm.$options.render
    let vnode = render.call(vm)

    return vnode
  }
}

function createElement(tag, data = {}, ...children) {
  return vnode(tag, data, data.key, children)
}

function createTextVnode(text) {
  return vnode(undefined, undefined, undefined, undefined, text)
}

/**
 * 生成虚拟dom
 * @param {string} [ tag ] - 标签
 * @param {object} [ data ] - 标签属性对象
 * @param {string} [ key ] - 节点 key 值
 * @param {Array} [ children ] - 子节点
 * @param {string} [ text ] - 文本内容
 */
function vnode(tag, data, key, children, text) {
  return {
    tag,
    data,
    key,
    children,
    text
  }
}