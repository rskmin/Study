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
  if (!vdom) return '';
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
  updateProps(dom, props);
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
  return dom;
}

/**
 * 将函数组件的虚拟DOM转化为真实DOM
 * @param {vdom} vdom 函数组件的虚拟DOM React元素
 */
function updateFunctionComponent(vdom) {
  const {type, props} = vdom;
  let renderVdom = type(props);
  return createDOM(renderVdom);
}

/**
 * 将类组件的虚拟DOM转化为真实DOM
 * @param {vdom} vdom 类组件的虚拟DOM React元素
 */
function updateClassComponent(vdom) {
  const {type, props} = vdom;
  let classInstance = new type(props);
  // componentWillMount
  classInstance.componentWillMount && classInstance.componentWillMount();
  let renderVdom = classInstance.render();
  const dom = createDOM(renderVdom);
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
 * @param {React.ClassAttributes} props 属性对象
 */
function updateProps(dom, newProps) {
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

const ReactDOM = {
  render,
  createDOM,
};

export default ReactDOM;
