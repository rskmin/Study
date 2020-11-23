import Component, {PureComponent} from './Component';
export const reactFragment = 'react.fragment';

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

function cloneElement(element, newProps, children) {
  if (arguments.length > 3) {
    children = Array.prototype.slice(arguments, 2);
  }
  newProps.children = children;
  return {
    ...element,
    newProps,
  }
}

function createRef() {
  return {
    current: null,
  };
}

function createContext() {
  let context = {_currentValue: null};
  /**
   * 缓存要提供的上下文内容
   * @param {Obj} props 
   * @param {any} props.value
   * @param {ReactDOM}
   */
  function Provider({ value, children }) {
    context._currentValue = value;
    return children;
  }
  function Consumer({ children }) {
    return children(context._currentValue)
  }
  context.Provider = Provider;
  context.Consumer = Consumer;
  return context;
}

let React = {
  createElement,
  Component,
  createRef,
  createContext,
  cloneElement,
  PureComponent,
};

export default React;