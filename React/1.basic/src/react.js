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
  let props = {...config};
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

let React = {
  createElement,
  Component,
  createRef,
};

export default React;