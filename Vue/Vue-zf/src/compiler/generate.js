const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
// FROM: <div id="app" style="color:red"> hello {{name}} <span>hello</span></div>

// TO: render() {
//   return _c('div', {id: 'app', style: {color: 'red'}}, _v('hello' + _s(name)), _c('span', null, _v('hello')))
// }

/**
 * 解析标签属性
 * @param {object} attrs
 */
function genProps(attrs) {
  let str = ''
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i]
    if (attr.name === 'style') {
      let obj = {}
      attr.value.split(';').forEach(item => {
        let [key, value] = item.split(':')
        obj[key] = value
      })
      attr.value = obj
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0, -1)}}`
}

/**
 * 解析子节点
 * @param {object} node - 子节点
 */
function gen(node) {
  if (node.type == 1) { // 如果是元素节点
    return generate(node)
  }
  let text = node.text // 获取文本
  // 如果是普通文本 不带{{}}
  if (!defaultTagRE.test(text)) {
    return `_v(${JSON.stringify(text)})`
  }
  let tokens = []
  let lastIndex = defaultTagRE.lastIndex = 0 // 重置正则匹配
  let match, index

  while (match = defaultTagRE.exec(text)) {
    index = match.index
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)))
    }
    tokens.push(`_s(${match[1].trim()})`)
    lastIndex = index + match[0].length
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)))
  }
  return `_v(${tokens.join('+')})`
}

/**
 * 拼接子节点
 * @param {object} el - ASTNode
 */
function genChildren(el) {
  const children = el.children
  if (children) { // 将所有转化后的子节点用逗号拼接
    return children.map(child => gen(child)).join(',')
  }
}

/**
 * 解析AST为render返回值
 * @param {object} el - ASTNode
 */
export function generate(el) {
  let children = genChildren(el) // 子节点的生成
  let code = `_c('${el.tag}', ${
    el.attrs.length ? `${genProps(el.attrs)}` : 'undefined'
  }${
    children ? `,${children}`: ''
  })`

  return code
}