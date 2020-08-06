export function patch(oldVnode, vnode) {
  // 将虚拟节点转化成真实节点
  let el = createElm(vnode)
  let parentElm = oldVnode.parentNode
  parentElm.insertBefore(el, oldVnode.nextSibling)
  parentElm.removeChild(oldVnode)
}

/**
 * 根据虚拟dom创建真实节点
 * @param {object} vnode - 虚拟dom
 */
function createElm(vnode) {
  let {tag, children, key, data, text} = vnode
  if (typeof tag == 'string') {
    vnode.el = document.createElement(tag)
    children.forEach(child => {
      vnode.el.appendChild(createElm(child))
    })
  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}