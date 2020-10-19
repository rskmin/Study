/**
 * 
 * @param {string} type 元素的类型
 * @param {Object} config 配置对象，一般是属性对象
 * @param {string | Object} children 第一个子元素
 */
function createElement(type, config, children) {
  if (config) {
    delete config._owner;
    delete config._store;
  }
  let props = {...config};
  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 2);
  }
  props.children = children;
  return {
    type, props
  }
}

let React = {
  createElement,
};

export default React;