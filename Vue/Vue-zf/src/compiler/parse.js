/* eslint-disable no-useless-escape */
const ncname = '[a-zA-Z_][\\-\\.0-9_a-zA-Z]*'
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`) // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/ // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >

/**
 * 解析HTML为抽象语法树(AST)
 * @param {string} html
 */
export function parseHTML(html) {
  function createASTElement(tagName, attrs) {
    return {
      tag: tagName,
      type: 1,
      children: [],
      attrs,
      parent: null
    }
  }

  let root
  let currentParent
  let stack = []
  function start(tagName, attrs) {
    let element = createASTElement(tagName, attrs)
    if (!root) {
      root = element
    }
    currentParent = element // 保存当前解析的标签
    stack.push(element) // 将生成的ast元素放到栈中
  }
  function end(tagName) {
    let element = stack.pop() // 取出栈中的最后一个
    currentParent = stack[stack.length - 1]
    if (currentParent) { // 在闭合时可以知道该标签的父节点
      // 解决ast父子关系
      element.parent = currentParent
      currentParent.children.push(element)
    }
  }
  function chars(text) {
    // text = text.replace(/\s/g, '') // 删除空字符串
    if (text) {
      currentParent.children.push({
        type: 3,
        text
      })
    }
  }

  while (html) {
    let textEnd = html.indexOf('<')
    if (textEnd == 0) { // 处理标签
      const startTagMatch = parseStartTag() // 开始标签匹配的结果
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }
      const endTagMatch = html.match(endTag)
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        end(endTagMatch[1]) // 将结束标签传入
        continue
      }
    }
    let text
    if (textEnd > 0) { // 处理文本
      // 截取文本
      text = html.substring(0, textEnd)
    }
    if (text) {
      advance(text.length)
      chars(text)
    }
  }
  function advance(n) { // 截取剩余字符串
    html = html.substring(n)
  }
  function parseStartTag() { // 解析标签头
    const start = html.match(startTagOpen)
    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length) // 删除开始标签
      let end
      let attr
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5]
        })
        advance(attr[0].length)
      }
      if (end) {
        advance(end[0].length)
        return match
      }
    }
  }

  return root
}
