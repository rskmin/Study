import Component from './Component';

/**
 * 
 * @param {string | Function} type 元素的类型
 * @param {Object} config 配置对象，一般是属性对象
 * @param {string | Object} children 第一个子元素
 */
function createElement(type, config, children) {
  let ref;
  if (config) {
    delete config._owner;
    delete config._store;
    ref = config.ref;
    delete config.ref;
  }
  let props = { ...config };
  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 2);
  }
  props.children = children;
  return {
    type, props, ref,
  }
}

function createRef() {
  return {
    current: null,
  };
}

function createContext() {
  /**
   * 缓存要提供的上下文内容
   * @param {Obj} props 
   * @param {any} props.value
   * @param {ReactDOM}
   */
  function Provider({ value, children }) {
    Provider.value = value;
    return children;
  }
  function Consumer({ children }) {
    return children(Provider.value)
  }
  return {
    Provider,
    Consumer,
  }
}

let React = {
  createElement,
  Component,
  createRef,
  createContext,
};

export default React;