import { ReactElement } from './types'

/**
 * 创建 React 元素
 * @param {string} type React 元素的类型
 * @param {Record<string, any>} config 配置对象
 * @param {any} children 儿子
 */
function createElement(type: string, config: Record<string, any>, ...children: Array<any>): ReactElement {
  let propName: string // 属性名
  const props: Record<string, any> = {}
  for (propName in config) {
    props[propName] = config[propName]
  }
  // const childrenLength = arguments.length - 2
  // if (childrenLength === 1) {
  //   props.children = children
  // } else {
  //   props.children = Array.prototype.slice.call(arguments, 2)
  // }
  props.children = children
  let element: ReactElement = {
    type,
    props
  }
  return element
}

export default createElement