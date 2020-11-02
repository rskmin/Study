import { addEvent } from './event';

/**
 * @typedef {null | number | string | React.ReactElement} vdom
 */

/**
 * 将虚拟DOM转换为真实DOM，并插入到容器中
 * @param {vdom} vdom 虚拟DOM
 * @param {HTMLElement} container 容器
 */
function render(vdom, container) {
  const dom = createDOM(vdom);
  container.appendChild(dom);
}

/**
 * 把虚拟DOM转换为真实DOM
 * @param {vdom} vdom 虚拟DOM
 */
function createDOM(vdom) {
  // 如果vdom是一个字符串或者数字，创建一个文本节点
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom);
  }
  // 否则就是一个React元素
  let { type, props, ref } = vdom;
  if (typeof type === 'function') { // React组件
    // 类组件
    if (type.isReactComponent) return updateClassComponent(vdom);
    // 函数组件
    return updateFunctionComponent(vdom);
  }
  // 原生元素
  let dom = document.createElement(type);
  updateProps(dom, {}, props);
  // 处理子节点
  if (typeof vdom.props.children === 'string' || typeof vdom.props.children === 'number') {
    dom.textContent = props.children;
  } else if (Array.isArray(props.children)) {
    reconcileChildren(props.children, dom);
  } else if (typeof props.children === 'object') {
    render(props.children, dom);
  } else {
    dom.textContent = props.children ? props.children.toString() : '';
  }
  !!ref && (ref.current = dom);
  vdom.dom = dom;
  return dom;
}

/**
 * 将函数组件的虚拟DOM转化为真实DOM
 * @param {vdom} vdom 函数组件的虚拟DOM React元素
 */
function updateFunctionComponent(vdom) {
  const { type, props } = vdom;
  let renderVdom = type(props);
  return createDOM(renderVdom);
}

/**
 * 将类组件的虚拟DOM转化为真实DOM
 * @param {vdom} vdom 类组件的虚拟DOM React元素
 */
function updateClassComponent(vdom) {
  const { type, props } = vdom;
  let classInstance = new type(props);
  vdom.classInstance = classInstance; // 在虚拟dom上绑定类组件的实例
  // componentWillMount
  classInstance.componentWillMount && classInstance.componentWillMount();
  let renderVdom = classInstance.render();
  const dom = createDOM(renderVdom);
  // 当前类虚拟DOM的dom属性和render方法返回的虚拟DOM的dom属性都指向真实dom
  vdom.dom = renderVdom.dom = dom;
  classInstance.oldVdom = renderVdom;
  classInstance.dom = dom;
  // componentDidMount
  classInstance.componentDidMount && classInstance.componentDidMount();
  return dom;
}

/**
 * 把子节点从虚拟DOM全部转成真实DOM并且插入到父节点中
 * @param {Array<vdom>} childrenVdom 子节点的虚拟DOM
 * @param {HTMLElement} parentDOM 父节点的真实DOM
 */
function reconcileChildren(childrenVdom, parentDOM) {
  childrenVdom.forEach(childVdom => render(childVdom, parentDOM));
}

/**
 * 把虚拟DOM的属性更新到真实DOM上
 * @param {HTMLElement} dom DOM元素
 * @param {React.ClassAttributes} oldProps 旧的属性对象
 * @param {React.ClassAttributes} newProps 新的属性对象
 */
function updateProps(dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === 'children') continue;
    if (key === 'style') {
      let styleObject = newProps[key];
      for (let key in styleObject) {
        dom.style[key] = styleObject[key];
      }
    } else if (key.startsWith('on')) {
      // dom[key.toLocaleLowerCase()] = newProps[key];
      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
    } else {
      dom[key] = newProps[key];
    }
  }
}

/**
 * @param {vdom} parentDOM 父DOM节点
 * @param {vdom} oldVdom 老的虚拟DOM
 * @param {vdom} newVdom 新的虚拟DOM
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom) {
  if (!oldVdom && !newVdom) {
    return null;
  } else if (oldVdom && !newVdom) {
    const currentDOM = oldVdom.dom;
    currentDOM.parentNode.removeChild(currentDOM);
    // componentWillUnmount
    oldVdom.classInstance?.componentWillUnmount && oldVdom.classInstance.componentWillUnmount();
    return null;
  } else if (!oldVdom && newVdom) {
    let newDOM = createDOM(newVdom);
    newVdom.dom = newDOM;
    parentDOM.appendChild(newDOM);
    return newVdom;
  } else {
    updateElement(oldVdom, newVdom);
    return newVdom;
  }
}

/**
 * 深度比较
 * @param {vdom} oldVdom 老的虚拟DOM
 * @param {vdom} newVdom 新的虚拟DOM
 */
function updateElement(oldVdom, newVdom) {
  const currentDOM = newVdom.dom = oldVdom.dom; // 虚拟DOM要使用新的，但真实DOM要基于旧DOM作更新
  newVdom.classInstance = oldVdom.classInstance;
  if (typeof oldVdom.type === 'string') { // 原生DOM类型
    updateProps(currentDOM, oldVdom.props, newVdom.props);
    updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
  } else if (typeof oldVdom.type === 'function') { // 类组件或函数组件
    updateClassInstance(oldVdom, newVdom);
  }
}

/**
 * 更新子节点
 * @param {HTMLElement} parentDOM 父真实DOM
 * @param {vdom} oldVChildren 老的虚拟DOM子节点
 * @param {vdom} newVChildren 新的虚拟DOM子节点
 */
function updateChildren(parentDOM, oldVChildren, newVChildren) {
  if ((typeof oldVChildren === 'string' || typeof oldVChildren === 'number')
    && (typeof newVChildren === 'string' || typeof newVChildren === 'number')) {
    if (oldVChildren !== newVChildren) (parentDOM.innerText = newVChildren);
    return;
  }
  oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren];
  newVChildren = Array.isArray(newVChildren) ? newVChildren : [newVChildren];
  const maxLength = Math.max(oldVChildren.length, newVChildren.length);
  // TODO: DOM-DIFF优化
  for (let i = 0; i< maxLength; i++) {
    compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i]);
  }
}
function updateClassInstance(oldVdom, newVdom) {
  const classInstance = oldVdom.classInstance;
  classInstance.componentWillReceiveProps && classInstance.componentWillReceiveProps();
  classInstance.updater.emitUpdate(newVdom.props);
}

const ReactDOM = {
  render,
  createDOM,
};

export default ReactDOM;