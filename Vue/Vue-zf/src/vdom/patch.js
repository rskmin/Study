export function patch(oldVnode, vnode) {
  // 将虚拟节点转化成真实节点
  let el = createElm(vnode);
  let parentElm = oldVnode.parentNode;
  parentElm.insertBefore(el, oldVnode.nextSibling);
  parentElm.removeChild(oldVnode);
  return el;
}

/**
 * 根据虚拟dom创建真实节点
 * @param {object} vnode - 虚拟dom
 */
function createElm(vnode) {
  let {tag, children, key, data, text} = vnode;
  if (typeof tag == 'string') {
    vnode.el = document.createElement(tag);

    // 更新属性
    updateProperties(vnode);

    children.forEach(child => {
      vnode.el.appendChild(createElm(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

function updateProperties(vnode) {
  let el = vnode.el;
  let newProps = vnode.data || {};

  for (let key in newProps) {
    if (key === 'style') {
      for (let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName];
      }
    } else if (key === 'class') {
      el.className = el.class;
    } else {
      el.setAttribute(key, newProps[key]);
    }
  }
}