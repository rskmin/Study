class Component {
  static isReactComponent = true
  constructor(props) {
    this.props = props
  }
}

/**
 * 包装vdom
 * @param {*} type - dom类型
 * @param {*} props
 *
 * {
 *   type,
 *   props: {
 *      children: {} || [{}]
 *   }
 * }
 */
function ReactElement(type, props) {
  const element = {type, props}
  return element
}

/**
 * 构造vdom属性并返回vdom
 * @param {*} type - dom类型
 * @param {*} config
 * @param {*} children - 子元素
 */
function createElement(type, config={}, children) {
  let propName
  const props = {}
  for (propName in config) {
    props[propName] = config[propName]
  }
  // 收集子组件
  const childrenLength = arguments.length - 2
  if (childrenLength === 1) {
    props.children = children
  } else if (childrenLength > 1) {
    props.children = Array.from(arguments).slice(2)
  }
  return ReactElement(type, props)
}

export default {createElement, Component}